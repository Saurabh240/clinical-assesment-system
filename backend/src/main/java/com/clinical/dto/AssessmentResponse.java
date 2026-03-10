package com.clinical.dto;

import com.clinical.model.FollowupStatus;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssessmentResponse {

    private Long id;

    private String ailmentCode;

    private JsonNode data;

    private FollowupStatus followupStatus;

    private Instant lastFollowupDate;

    private String pdfUrl;

    private Instant createdAt;
}
