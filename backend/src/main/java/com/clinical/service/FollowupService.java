package com.clinical.service;

import com.clinical.model.Assessment;
import com.clinical.model.FollowupResponse;
import com.clinical.model.FollowupStatus;
import com.clinical.repository.AssessmentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FollowupService {

    private final AssessmentRepository assessmentRepository;

    public List<FollowupResponse> getOverdueFollowups() {

        Instant now = Instant.now();

        return assessmentRepository.findAll()
                .stream()
                .map(a -> computeFollowup(a, now))
                .filter(Objects::nonNull)
                .sorted(Comparator.comparingLong(FollowupResponse::getOverdueDays).reversed())
                .toList();
    }

    private FollowupResponse computeFollowup(Assessment a, Instant now) {

        Instant baseDate =
                a.getLastFollowupDate() != null
                        ? a.getLastFollowupDate()
                        : a.getCreatedAt();

        long days = Duration.between(baseDate, now).toDays();

        if (days <= 14) {
            return null; // Not overdue
        }

        // Update status (optional persistence)
        a.setFollowupStatus(FollowupStatus.OVERDUE);

        String patientName = extractPatientName(a.getAssessmentData());

        return new FollowupResponse(
                a.getId(),
                patientName,
                a.getAilmentCode(),
                days - 14,
                a.getLastFollowupDate()
        );
    }

    private String extractPatientName(JsonNode data) {
        if (data == null) return "";
        JsonNode patient = data.get("patient");
        if (patient == null) return "";
        return patient.path("firstName").asText("") + " " +
                patient.path("lastName").asText("");
    }
}
