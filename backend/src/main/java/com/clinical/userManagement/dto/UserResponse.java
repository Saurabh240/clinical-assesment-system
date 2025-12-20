package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.Role;

import java.time.LocalDateTime;
import java.util.Set;

public record UserResponse(
        Long id,
        Pharmacy pharmacy,
        String email,
        String password,
        Set<Role> role,
        LocalDateTime createdAt) {
}
