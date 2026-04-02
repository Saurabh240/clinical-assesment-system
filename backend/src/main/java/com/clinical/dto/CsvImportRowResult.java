package com.clinical.dto;

public record CsvImportRowResult(
        int rowNumber,
        String code,
        String status,      // "SUCCESS" | "UPDATED" | "SKIPPED" | "ERROR"
        String message
) {}