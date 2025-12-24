package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.Role;
import com.clinical.userManagement.model.UserStatus;

import java.time.LocalDateTime;

public record SignupResponse(
        Long userId,
        UserStatus status,
        String nextStep
) {}
