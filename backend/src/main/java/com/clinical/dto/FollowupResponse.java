package com.clinical.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class FollowupResponse {

    private Long assessmentId;
    private String patientName;
    private String ailment;
    private long overdueDays;
    private Instant lastFollowupDate;
}
