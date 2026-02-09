package com.clinical.dto;

import com.clinical.model.FollowupStatus;

import java.time.Instant;
import java.time.LocalDate;

public record FollowupUpdateResponse(
        Long assessmentId,
        FollowupStatus status,
        Instant lastFollowupDate,
        LocalDate nextFollowupDate,
        String message
) {}

