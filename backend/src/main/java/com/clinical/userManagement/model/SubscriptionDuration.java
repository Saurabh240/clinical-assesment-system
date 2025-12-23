package com.clinical.userManagement.model;

import jakarta.persistence.Embeddable;

import java.time.LocalDateTime;

@Embeddable
public record SubscriptionDuration(
        LocalDateTime startedAt,
        LocalDateTime expireAt) {
}
