package com.clinical.dto;

import lombok.Data;

import java.util.Map;

@Data
public class AssessmentRequest {
    private String ailmentCode;
    private Map<String, Object> data;
}
