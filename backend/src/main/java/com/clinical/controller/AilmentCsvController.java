package com.clinical.controller;

import com.clinical.dto.CsvImportSummary;
import com.clinical.service.AuditLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/ailments/csv")
@RequiredArgsConstructor
public class AilmentCsvController {

    private final AilmentCsvImportService  importService;
    private final AilmentCsvTemplateService templateService;
    private final AuditLogService auditLogService;

    /**
     * GET /admin/ailments/csv/template
     * Downloads the CSV template file.
     */
    @GetMapping("/template")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> downloadTemplate() {
        byte[] csv = templateService.generateTemplate();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"ailments-template.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv);
    }

    /**
     * POST /admin/ailments/csv/import
     * Accepts multipart/form-data with field name "file".
     * Returns an import summary with per-row results.
     */
    @PostMapping(value = "/import", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CsvImportSummary> importCsv(
            @RequestPart("file") MultipartFile file,
            Authentication auth,
            HttpServletRequest request) {

        CsvImportSummary summary = importService.importCsv(file);

        String actor = auth != null ? auth.getName() : "system";
        String ip    = resolveIp(request);

        auditLogService.logCreated(
                "CSV_IMPORT", null,
                String.format("CSV import: %d inserted, %d updated, %d failed out of %d rows",
                        summary.inserted(), summary.updated(),
                        summary.failed(), summary.totalRows()),
                actor, ip);

        return ResponseEntity.ok(summary);
    }

    private String resolveIp(HttpServletRequest req) {
        String fwd = req.getHeader("X-Forwarded-For");
        if (fwd != null && !fwd.isBlank()) return fwd.split(",")[0].trim();
        return req.getRemoteAddr();
    }
}