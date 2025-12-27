package com.clinical.dto;

import com.clinical.model.Role;

public record AuthUser(
        Long userId,
        String email,
        Role role
) {}
