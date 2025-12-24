package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.Role;

public record AuthUser(
        Long userId,
        String email,
        Role role
) {}
