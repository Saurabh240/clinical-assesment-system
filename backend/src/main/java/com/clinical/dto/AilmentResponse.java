package com.clinical.dto;

import com.fasterxml.jackson.databind.JsonNode;

public record AilmentResponse(
        Long id,
        String code,
        String name,
        JsonNode fieldsConfig,
        boolean active) {
}
