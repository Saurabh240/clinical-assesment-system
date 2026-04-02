package com.clinical.dto;

import com.clinical.model.FollowupStatus;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class AssessmentFilterRequest {

    private String ailmentCode;
    private FollowupStatus followupStatus;

    private String patientName;

    private Instant dateFrom;
    private Instant dateTo;

    private int page = 0;
    private int size = 10;

    private String sortBy = "date";
    private String sortDirection = "DESC";

    // Set automatically by the controller from the JWT — never from the client
    private Long callerUserId;
}
