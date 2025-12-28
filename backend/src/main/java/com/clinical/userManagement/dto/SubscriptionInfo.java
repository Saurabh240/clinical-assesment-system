package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.SubscriptionPlan;
import com.clinical.userManagement.model.SubscriptionStatus;

import java.time.Instant;

public record SubscriptionInfo(
        SubscriptionPlan plan,
        SubscriptionStatus status,
        Instant expiresOn
) {}
