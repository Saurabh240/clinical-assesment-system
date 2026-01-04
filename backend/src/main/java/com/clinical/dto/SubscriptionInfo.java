package com.clinical.dto;

import com.clinical.model.SubscriptionPlan;
import com.clinical.model.SubscriptionStatus;

import java.time.Instant;

public record SubscriptionInfo(
        SubscriptionPlan plan,
        SubscriptionStatus status,
        Instant expiresOn
) {}
