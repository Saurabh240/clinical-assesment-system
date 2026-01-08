package com.clinical.dto;

import com.fasterxml.jackson.databind.JsonNode;

public record AilmentRequest(
        Long id,
        String code,
        String name,
        JsonNode fieldsConfig,
        boolean active) {
}
