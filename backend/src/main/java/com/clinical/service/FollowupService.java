package com.clinical.service;

import com.clinical.dto.FollowUpRequest;
import com.clinical.dto.FollowupReadResponse;
import com.clinical.dto.FollowupResponse;
import com.clinical.dto.FollowupUpdateResponse;
import com.clinical.model.Assessment;
import com.clinical.model.FollowUp;
import com.clinical.model.FollowupStatus;
import com.clinical.repository.AssessmentRepository;
import com.clinical.repository.FollowUpRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.util.List;
import java.util.Objects;

import static com.clinical.model.FollowupStatus.COMPLETED;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowupService {

    private static final long FOLLOWUP_THRESHOLD_DAYS = 14;

    private final AssessmentRepository assessmentRepository;
    private final FollowUpRepository followupRepository;
    private final AuditLogService auditLogService;

    @Transactional(readOnly = true)
    public List<FollowupReadResponse> getOverdueFollowups() {

        Instant now = Instant.now();
        Instant thresholdDate = now.minus(Duration.ofDays(FOLLOWUP_THRESHOLD_DAYS));

        return assessmentRepository
                .findByLastFollowupDateBeforeOrLastFollowupDateIsNull(thresholdDate)
                .stream()
                .map(a -> buildOverdueResponse(a, now))
                .toList();
    }

    private FollowupReadResponse buildOverdueResponse(Assessment a, Instant now) {

        Instant baseDate = getBaseFollowupDate(a);
        long daysSince = Duration.between(baseDate, now).toDays();
        long overdueDays = Math.max(0, daysSince - FOLLOWUP_THRESHOLD_DAYS);

        return new FollowupReadResponse(
                a.getId(),
                extractPatientName(a.getAssessmentData()),
                a.getAilmentCode(),
                overdueDays,
                a.getLastFollowupDate(),
                FollowupStatus.OVERDUE
        );
    }

    public FollowupUpdateResponse createFollowup(
            Long assessmentId,
            FollowUpRequest request,
            String updatedBy
    ) {

        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assessment not found"));

        validateFollowupRequest(request);

        FollowupStatus oldStatus = assessment.getFollowupStatus();

        if (COMPLETED.equals(oldStatus) && !COMPLETED.equals(request.status())) {
            throw new IllegalStateException("Cannot revert completed follow-up");
        }

        FollowUp followup = FollowUp.builder()
                .assessment(assessment)
                .notes(request.notes())
                .status(request.status())
                .nextFollowupDate(request.nextFollowupDate())
                .createdAt(Instant.now())
                .createdBy(updatedBy)
                .build();

        followupRepository.save(followup);

        assessment.setLastFollowupDate(Instant.now());
        assessment.setFollowupStatus(request.status());

        if (!Objects.equals(oldStatus, request.status())) {
            auditLogService.logStatusChange(
                    "ASSESSMENT",
                    assessmentId,
                    oldStatus,
                    request.status(),
                    updatedBy,
                    "System"
            );
        }

        return new FollowupUpdateResponse(
                assessment.getId(),
                assessment.getFollowupStatus(),
                assessment.getLastFollowupDate(),
                followup.getNextFollowupDate(),
                followup.getNotes(),
                "Follow-up created successfully"
        );
    }

    @Transactional(readOnly = true)
    public FollowupResponse getLatestFollowup(Long assessmentId) {

        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assessment not found"));

        FollowUp followup = followupRepository
                .findTopByAssessmentIdOrderByCreatedAtDesc(assessmentId)
                .orElseThrow(() -> new IllegalArgumentException("Follow-up not found"));

        Instant now = Instant.now();
        Instant baseDate = getBaseFollowupDate(assessment);

        long daysSince = Duration.between(baseDate, now).toDays();
        long overdueDays = Math.max(0, daysSince - FOLLOWUP_THRESHOLD_DAYS);

        return new FollowupResponse(
                assessment.getId(),
                extractPatientName(assessment.getAssessmentData()),
                assessment.getAilmentCode(),
                overdueDays,
                assessment.getLastFollowupDate(),
                assessment.getFollowupStatus(),
                followup.getNotes()
        );
    }

    private Instant getBaseFollowupDate(Assessment a) {
        return a.getLastFollowupDate() != null
                ? a.getLastFollowupDate()
                : a.getCreatedAt();
    }

    private void validateFollowupRequest(FollowUpRequest request) {

        if (request == null) {
            throw new IllegalArgumentException("Follow-up request cannot be null");
        }

        if (request.status() == null) {
            throw new IllegalArgumentException("Follow-up status is required");
        }

        if (request.nextFollowupDate() != null &&
                request.nextFollowupDate().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Next follow-up date cannot be in the past");
        }
    }

    private String extractPatientName(JsonNode data) {

        if (data == null) return "";

        JsonNode patient = data.path("patient");

        String firstName = patient.path("firstName").asText("");
        String lastName = patient.path("lastName").asText("");

        return (firstName + " " + lastName).trim();
    }
}


