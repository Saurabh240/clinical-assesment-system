package com.clinical.dto;

import com.clinical.model.SubscriptionPlan;

public record CreateCheckoutRequest(
        SubscriptionPlan plan
) {}
