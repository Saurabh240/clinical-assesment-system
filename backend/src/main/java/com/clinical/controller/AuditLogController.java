package com.clinical.controller;

import com.clinical.dto.AuditLogResponse;
import com.clinical.model.AuditLog;
import com.clinical.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
     * Query params (all optional):
     *   search    — full-text filter across updatedBy, entity, details, action
     *   action    — exact action filter (CREATE, UPDATE, DELETE, LOGIN, etc.)
     *   entity    — exact entity type filter (USER, ASSESSMENT, etc.)
     *   page      — 0-based page index (default 0)
     *   size      — page size (default 20, max 100)
     *   startDate — ignored for now (future date-range filter)
     *   endDate   — ignored for now
     */
    @GetMapping
    @PreAuthorize("hasRole('PHARMACY_ADMIN')")
    public ResponseEntity<Page<AuditLogResponse>> list(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false, defaultValue = "") String action,
            @RequestParam(required = false, defaultValue = "") String entity,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size,
            // Accept but ignore startDate/endDate sent by the frontend
            // (wire them into the query when date-range filtering is needed)
            @RequestParam(required = false, defaultValue = "") String startDate,
            @RequestParam(required = false, defaultValue = "") String endDate) {

        size = Math.min(size, 100);

        Page<AuditLogResponse> result = auditLogRepository
                .search(search, action, entity,
                        PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt")))
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