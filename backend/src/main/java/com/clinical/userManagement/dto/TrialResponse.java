package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.SubscriptionPlan;

import java.time.Instant;

public record TrialResponse(
        SubscriptionPlan plan,
        Instant expiresOn,
        String redirect
) {}
