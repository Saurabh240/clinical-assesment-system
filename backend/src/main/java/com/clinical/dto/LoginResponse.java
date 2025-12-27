package com.clinical.dto;

import com.clinical.model.UserStatus;

public record LoginResponse(
        Long userId,
        UserStatus status,
        String nextStep,
        String accessToken) {}
