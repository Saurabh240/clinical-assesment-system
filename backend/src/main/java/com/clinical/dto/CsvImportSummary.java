package com.clinical.dto;

import java.util.List;

public record CsvImportSummary(
        int totalRows,
        int inserted,
        int updated,
        int skipped,
        int failed,
        List<CsvImportRowResult> rows
) {}