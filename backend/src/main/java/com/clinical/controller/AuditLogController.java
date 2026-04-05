package com.clinical.controller;

import com.clinical.dto.AuditLogResponse;
import com.clinical.model.AuditLog;
import com.clinical.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogRepository auditLogRepository;

    /**
     * GET /admin/audit-logs
     * Query params: search, action, entity, page (0-based), size
     */
    @GetMapping
    @PreAuthorize("hasRole('PHARMACY_ADMIN')")
    public ResponseEntity<Page<AuditLogResponse>> list(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false, defaultValue = "") String action,
            @RequestParam(required = false, defaultValue = "") String entity,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size) {

        size = Math.min(size, 100);

        Page<AuditLogResponse> result = auditLogRepository
                .search(search, action, entity, PageRequest.of(page, size))
                .map(this::toResponse);

        return ResponseEntity.ok(result);
    }

    /**
     * GET /admin/audit-logs/{id}
     * Returns full detail of a single log entry.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PHARMACY_ADMIN')")
    public ResponseEntity<AuditLogResponse> getById(@PathVariable Long id) {
        return auditLogRepository.findById(id)
                .map(this::toResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private AuditLogResponse toResponse(AuditLog a) {
        return new AuditLogResponse(
                a.getId(),
                a.getEntity(),
                a.getEntityId(),
                a.getAction(),
                a.getField(),
                a.getOldValue(),
                a.getNewValue(),
                a.getDetails(),
                a.getUpdatedBy(),
                a.getIpAddress(),
                a.getUpdatedAt()
        );
    }
}