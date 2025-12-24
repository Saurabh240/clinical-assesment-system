package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.UserStatus;

public record LoginResponse(
        Long userId,
        UserStatus status,
        String nextStep
) {}
