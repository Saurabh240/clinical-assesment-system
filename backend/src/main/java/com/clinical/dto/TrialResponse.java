package com.clinical.dto;

import com.clinical.model.SubscriptionPlan;

import java.time.Instant;

public record TrialResponse(
        SubscriptionPlan plan,
        Instant expiresOn,
        String redirect
) {}
