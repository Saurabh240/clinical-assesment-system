package com.clinical.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class FollowupResponse {

    private Long assessmentId;
    private String patientName;
    private String ailment;
    private long overdueDays;
    private Instant lastFollowupDate;
}
