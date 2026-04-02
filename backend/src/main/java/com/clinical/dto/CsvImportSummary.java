package com.clinical.dto;

public record CsvImportSummary(
        int totalRows,
        int inserted,
        int updated,
        int skipped,
        int failed,
        List<CsvImportRowResult> rows
) {}