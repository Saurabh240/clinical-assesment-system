package com.clinical.dto;

import com.clinical.model.FollowupStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class FollowupReadResponse {

    private Long assessmentId;
    private String patientName;
    private String ailment;
    private long overdueDays;
    private Instant lastFollowupDate;
    private FollowupStatus status;
}
