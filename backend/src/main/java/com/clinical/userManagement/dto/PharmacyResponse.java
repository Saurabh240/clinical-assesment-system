package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.SubscriptionStatus;

import java.time.LocalDateTime;

public record PharmacyResponse(
        Long id,
        String name,
        String address,
        String phone,
        String fax,
        String logoUrl,
        SubscriptionStatus subscriptionStatus,
        LocalDateTime createdAt) {
}
