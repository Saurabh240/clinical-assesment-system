package com.clinical.userManagement.dto;

import java.time.LocalDateTime;

public record PharmacyResponse(
        Long id,
        String name,
        String address,
        String phone,
        String fax,
        String logoUrl,
        LocalDateTime createdAt) {
}
