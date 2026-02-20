package com.clinical.dto;

import com.clinical.model.FollowupStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssessmentSummaryResponse {

    private Long id;

    private String ailmentCode;

    private String patientFirstName;

    private String patientLastName;

    private FollowupStatus followupStatus;

    private Instant createdAt;

    private boolean overdue;

    private long overdueDays;
}

