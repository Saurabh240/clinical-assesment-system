package com.clinical.dto;

import java.time.Instant;

public record AuditLogResponse(
        Long id,
        String entity,
        Long entityId,
        String action,
        String field,
        String oldValue,
        String newValue,
        String details,
        String updatedBy,
        String ipAddress,
        Instant updatedAt
) {}