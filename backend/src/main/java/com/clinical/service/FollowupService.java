package com.clinical.service;

import com.clinical.dto.FollowUpRequest;
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
import java.time.chrono.ChronoLocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FollowupService {

    private final AssessmentRepository assessmentRepository;
    private final AuditLogService auditLogService;// assume already exists
    private final FollowUpRepository followupRepository;

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
        // Mark overdue (optional persistence)
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
    @Transactional
    public FollowupUpdateResponse addOrUpdateFollowup(
            Long assessmentId,
            FollowUpRequest request,
            String updatedBy
    ) {
        // 1️⃣ Assessment must exist
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Assessment not found"));
        // 2️⃣ Business validation
        if (request.nextFollowupDate().isBefore((Instant.now()))) {
            throw new IllegalArgumentException(
                    "Next follow-up date cannot be in the past");
        }
        // 3️⃣ Insert or update Followup record
        FollowUp followup = followupRepository
                .findByAssessmentId(assessmentId)
                .orElse(FollowUp.builder()
                        .assessment(assessment)
                        .build());
        followup.setNotes(request.notes());
        followup.setNextFollowupDate(request.nextFollowupDate());
        followup.setUpdatedAt(
                Instant.now()
        );

        followup.setUpdatedBy(updatedBy);
        followup.setStatus(request.status());
        followupRepository.save(followup);
        // 4️⃣ Update Assessment fields (ONLY allowed ones)
        FollowupStatus oldStatus = assessment.getFollowupStatus();
        assessment.setLastFollowupDate((Instant.now()));
        assessment.setFollowupStatus(request.status());
        assessmentRepository.save(assessment);
        // 5️⃣ Audit logging (status change)
        if (oldStatus != request.status()) {
            auditLogService.log(
                    "ASSESSMENT",
                    assessmentId,
                    "followupStatus",
                    oldStatus,
                    request.status(),
                    updatedBy
            );
        }

        return new FollowupUpdateResponse(
                assessment.getId(),
                assessment.getFollowupStatus(),
                assessment.getLastFollowupDate(),
                followup.getNextFollowupDate(),
                "Follow-up updated successfully"
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
