package com.clinical.dto;

public record AuditLogFilterRequest(
        String search,
        String action,
        String entity,
        int page,
        int size
) {
    public AuditLogFilterRequest {
        if (page < 0)  page = 0;
        if (size <= 0) size = 20;
        if (size > 100) size = 100;
    }
}