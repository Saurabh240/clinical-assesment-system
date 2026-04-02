package com.clinical.service;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

@Service
public class AilmentCsvTemplateService {

    private static final String[] HEADERS = {"code", "name", "active", "fields_config"};

    /** Returns a byte array of the CSV template with headers + two sample rows. */
    public byte[] generateTemplate() {
        try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
             PrintWriter pw = new PrintWriter(
                     new OutputStreamWriter(bos, StandardCharsets.UTF_8));
             CSVPrinter printer = new CSVPrinter(pw,
                     CSVFormat.DEFAULT.builder().setHeader(HEADERS).build())) {

            // Sample row 1 — with fields_config
            printer.printRecord(
                    "UTI",
                    "Urinary Tract Infection",
                    "true",
                    "{\"symptoms\":[\"burning\",\"frequency\"],\"requiresLab\":true}"
            );

            // Sample row 2 — no fields_config (optional column)
            printer.printRecord(
                    "DERM",
                    "Dermatitis",
                    "true",
                    ""
            );

            printer.flush();
            return bos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate CSV template", e);
        }
    }
}