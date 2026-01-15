package com.clinical.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AssessmentFilterRequest {

    private String patientName;
    private String ailmentCode;
    private String status;

    private LocalDate dateFrom;
    private LocalDate dateTo;

    private int page = 0;
    private int size = 20;

    private String sortBy = "createdAt";
    private String sortDirection = "DESC";
}
