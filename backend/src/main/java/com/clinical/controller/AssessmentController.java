package com.clinical.controller;

import com.clinical.dto.*;
import com.clinical.service.AssessmentService;
import com.clinical.service.AuditLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService service;
    private final AuditLogService auditLogService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> create(
            @RequestBody AssessmentRequest req,
            @AuthenticationPrincipal AuthUser caller,
            HttpServletRequest httpRequest) {

        Long id = service.createAssessment(req);
        String actor = caller != null ? caller.email() : "system";

        auditLogService.logCreated(
                "ASSESSMENT", id,
                "Created new assessment for patient",
                actor,
                resolveIp(httpRequest));

        return ResponseEntity.ok(Map.of("id", id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentResponse> get(@PathVariable Long id, @AuthenticationPrincipal AuthUser caller) {
        return ResponseEntity.ok(service.getAssessment(id, caller));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable Long id,
            @RequestBody AssessmentRequest req,
            @AuthenticationPrincipal AuthUser caller,
            HttpServletRequest httpRequest) {

        service.updateAssessment(id, req, caller);
        String actor = caller != null ? caller.email() : "system";
        auditLogService.logUpdated(
                "ASSESSMENT", id,
                "Updated assessment #" + id,
                actor,
                resolveIp(httpRequest));

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/pdf")
    public ResponseEntity<Map<String, String>> generatePdf(@PathVariable Long id, @AuthenticationPrincipal AuthUser caller, HttpServletRequest httpRequest) {
        String url = service.generatePdf(id, caller);
        String actor = caller != null ? caller.email() : "system";
        auditLogService.logPdfGenerated(id, url, actor, resolveIp(httpRequest));
        return ResponseEntity.ok(Map.of("url", url));
    }

    @PostMapping("/getAllAssessments")
    public ResponseEntity<Page<AssessmentSummaryResponse>> getAssessments(
            AssessmentFilterRequest request) {

        return ResponseEntity.ok(service.getAssessments(request));
    }

    private String resolveIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}

