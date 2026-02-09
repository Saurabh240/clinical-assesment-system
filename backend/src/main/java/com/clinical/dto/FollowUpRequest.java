package com.clinical.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import com.clinical.model.FollowupStatus;

public record FollowUpRequest(

        @NotBlank(message = "Notes are required")
        String notes,

        @NotNull(message = "Next follow-up date is required")
        LocalDate nextFollowupDate,

        @NotNull(message = "Status is required")
        FollowupStatus status
) {}

