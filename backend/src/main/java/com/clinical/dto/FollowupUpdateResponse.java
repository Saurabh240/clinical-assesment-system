package com.clinical.dto;

import com.clinical.model.FollowupStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.Instant;
import java.time.LocalDate;

public record FollowupUpdateResponse(
        Long assessmentId,
        FollowupStatus status,
        Instant lastFollowupDate,
        Instant nextFollowupDate,
        String notes,
        String message
) {}

