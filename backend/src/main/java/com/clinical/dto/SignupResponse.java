package com.clinical.dto;

import com.clinical.model.UserStatus;

public record SignupResponse(
        Long userId,
        UserStatus status,
        String nextStep
) {}
