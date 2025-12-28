package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.SubscriptionPlan;

public record CreateCheckoutRequest(
        SubscriptionPlan plan
) {}
