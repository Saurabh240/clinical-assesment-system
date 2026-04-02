package com.clinical.service;

import com.clinical.dto.CsvImportRowResult;
import com.clinical.dto.CsvImportSummary;
import com.clinical.model.Ailment;
import com.clinical.repository.AilmentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AilmentCsvImportService {

    private static final String[] REQUIRED_HEADERS = {"code", "name", "active"};
    private static final int MAX_CODE_LENGTH  = 50;
    private static final int MAX_NAME_LENGTH  = 255;
    private static final int MAX_ROWS         = 5000;

    private final AilmentRepository ailmentRepository;
    private final ObjectMapper objectMapper;

    // ─────────────────────────────────────────────────────────────────────────
    // Public entry point
    // ─────────────────────────────────────────────────────────────────────────

    @Transactional
    public CsvImportSummary importCsv(MultipartFile file) {

        validateFileBasics(file);

        List<CsvImportRowResult> results = new ArrayList<>();
        int inserted = 0, updated = 0, skipped = 0, failed = 0;

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser parser = CSVFormat.DEFAULT
                     .builder()
                     .setHeader()
                     .setSkipHeaderRecord(true)
                     .setIgnoreHeaderCase(true)
                     .setTrim(true)
                     .setIgnoreEmptyLines(true)
                     .build()
                     .parse(reader)) {

            // Validate headers exist
            validateHeaders(parser.getHeaderMap().keySet());

            List<CSVRecord> records = parser.getRecords();
            if (records.size() > MAX_ROWS) {
                throw new IllegalArgumentException(
                        "CSV exceeds maximum row limit of " + MAX_ROWS + " rows.");
            }

            // Detect duplicate codes within the file itself
            Set<String> seenCodes = new HashSet<>();

            for (CSVRecord record : records) {
                int rowNum = (int) record.getRecordNumber() + 1; // +1 because header = row 1

                CsvImportRowResult result = processRow(record, rowNum, seenCodes);
                results.add(result);

                switch (result.status()) {
                    case "SUCCESS" -> inserted++;
                    case "UPDATED" -> updated++;
                    case "SKIPPED" -> skipped++;
                    case "ERROR"   -> failed++;
                }
            }

        } catch (IllegalArgumentException e) {
            throw e; // propagate validation errors as-is
        } catch (Exception e) {
            log.error("CSV import failed", e);
            throw new RuntimeException("Failed to parse CSV: " + e.getMessage(), e);
        }

        return new CsvImportSummary(
                inserted + updated + skipped + failed,
                inserted, updated, skipped, failed,
                results);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Row processor — each row is its own try/catch so one bad row doesn't
    // abort the whole import (partial-failure safety)
    // ─────────────────────────────────────────────────────────────────────────

    private CsvImportRowResult processRow(CSVRecord record, int rowNum, Set<String> seenCodes) {

        try {
            // ── 1. Extract fields ──────────────────────────────────────────
            String code   = get(record, "code");
            String name   = get(record, "name");
            String activeStr = get(record, "active");
            String fieldsConfigRaw = getOptional(record, "fields_config");

            // ── 2. Mandatory field validation ──────────────────────────────
            List<String> errors = new ArrayList<>();

            if (code.isBlank())
                errors.add("'code' is required");
            else if (code.length() > MAX_CODE_LENGTH)
                errors.add("'code' exceeds " + MAX_CODE_LENGTH + " characters");
            else if (!code.matches("[A-Za-z0-9_\\-]+"))
                errors.add("'code' must be alphanumeric (underscores/hyphens allowed)");

            if (name.isBlank())
                errors.add("'name' is required");
            else if (name.length() > MAX_NAME_LENGTH)
                errors.add("'name' exceeds " + MAX_NAME_LENGTH + " characters");

            if (activeStr.isBlank())
                errors.add("'active' is required (true/false)");
            else if (!activeStr.equalsIgnoreCase("true") && !activeStr.equalsIgnoreCase("false"))
                errors.add("'active' must be true or false");

            // ── 3. Parse optional JSON ─────────────────────────────────────
            JsonNode fieldsConfig = null;
            if (!fieldsConfigRaw.isBlank()) {
                try {
                    fieldsConfig = objectMapper.readTree(fieldsConfigRaw);
                    if (!fieldsConfig.isObject() && !fieldsConfig.isArray()) {
                        errors.add("'fields_config' must be a valid JSON object or array");
                        fieldsConfig = null;
                    }
                } catch (Exception e) {
                    errors.add("'fields_config' is not valid JSON: " + e.getMessage());
                }
            }

            if (!errors.isEmpty()) {
                return error(rowNum, code, String.join("; ", errors));
            }

            // ── 4. Intra-file duplicate check ──────────────────────────────
            String normalizedCode = code.toUpperCase();
            if (seenCodes.contains(normalizedCode)) {
                return new CsvImportRowResult(rowNum, code, "SKIPPED",
                        "Duplicate code in file — first occurrence was used");
            }
            seenCodes.add(normalizedCode);

            // ── 5. Upsert ──────────────────────────────────────────────────
            boolean active = Boolean.parseBoolean(activeStr);
            Optional<Ailment> existing = ailmentRepository.findByCode(code);

            if (existing.isPresent()) {
                Ailment ailment = existing.get();
                ailment.setName(name);
                ailment.setActive(active);
                if (fieldsConfig != null) ailment.setFieldsConfig(fieldsConfig);
                ailmentRepository.save(ailment);
                return new CsvImportRowResult(rowNum, code, "UPDATED",
                        "Ailment updated successfully");
            } else {
                Ailment ailment = new Ailment();
                ailment.setCode(code);
                ailment.setName(name);
                ailment.setActive(active);
                ailment.setFieldsConfig(fieldsConfig);
                ailmentRepository.save(ailment);
                return new CsvImportRowResult(rowNum, code, "SUCCESS",
                        "Ailment created successfully");
            }

        } catch (Exception e) {
            log.warn("Row {} failed unexpectedly: {}", rowNum, e.getMessage());
            return error(rowNum, getQuietly(record, "code"), "Unexpected error: " + e.getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Helpers
    // ─────────────────────────────────────────────────────────────────────────

    private void validateFileBasics(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("No file provided or file is empty.");
        }
        String originalName = file.getOriginalFilename();
        if (originalName == null || !originalName.toLowerCase().endsWith(".csv")) {
            throw new IllegalArgumentException("Only .csv files are accepted.");
        }
        if (file.getSize() > 10L * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds the 10MB limit.");
        }
    }

    private void validateHeaders(Set<String> actual) {
        Set<String> lowerActual = new HashSet<>();
        actual.forEach(h -> lowerActual.add(h.toLowerCase()));

        List<String> missing = new ArrayList<>();
        for (String required : REQUIRED_HEADERS) {
            if (!lowerActual.contains(required)) missing.add(required);
        }
        if (!missing.isEmpty()) {
            throw new IllegalArgumentException(
                    "CSV is missing required columns: " + String.join(", ", missing)
                            + ". Expected headers: code, name, active[, fields_config]");
        }
    }

    private String get(CSVRecord record, String col) {
        try { return record.get(col) == null ? "" : record.get(col).trim(); }
        catch (IllegalArgumentException e) { return ""; }
    }

    private String getOptional(CSVRecord record, String col) {
        try { return record.isMapped(col) && record.get(col) != null
                ? record.get(col).trim() : ""; }
        catch (Exception e) { return ""; }
    }

    private String getQuietly(CSVRecord record, String col) {
        try { return record.get(col); } catch (Exception e) { return "?"; }
    }

    private CsvImportRowResult error(int row, String code, String msg) {
        return new CsvImportRowResult(row, code, "ERROR", msg);
    }
}