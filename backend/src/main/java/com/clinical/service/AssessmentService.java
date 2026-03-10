package com.clinical.service;

import com.clinical.dto.*;
import com.clinical.model.Assessment;
import com.clinical.model.FollowupStatus;
import com.clinical.repository.AssessmentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentService {

    private final AssessmentRepository repository;
    private final ObjectMapper mapper;
    private final PdfHtmlService htmlBuilder;
    private final PdfClient pdfClient;
    private final S3Service s3;

    private static final Map<String, String> SORT_FIELD_MAP = Map.of(
            "date", "createdAt",
            "ailment", "ailmentCode"
    );

    // ================= CREATE =================
    public Long createAssessment(AssessmentRequest req) {

        Assessment a = new Assessment();
        a.setAilmentCode(req.getAilmentCode());
        a.setAssessmentData(mapper.valueToTree(req.getData()));
        a.setCreatedAt(Instant.now());
        a.setFollowupStatus(FollowupStatus.PENDING);
        a.setLastFollowupDate(null);

        repository.save(a);
        return a.getId();
    }

    // ================= GET DETAIL =================
    @Transactional
    public AssessmentResponse getAssessment(Long id) {

        Assessment a = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        return mapToDetailDto(a);
    }

    // ================= UPDATE =================
    public void updateAssessment(Long id, AssessmentRequest req) {

        Assessment a = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        a.setAilmentCode(req.getAilmentCode());
        a.setAssessmentData(mapper.valueToTree(req.getData()));
        a.setPdfUrl(null);
    }

    // ================= LIST =================
    @Transactional
    public Page<AssessmentSummaryResponse> getAssessments(AssessmentFilterRequest req) {

        Pageable pageable = buildPageable(req);
        Specification<Assessment> spec =
                AssessmentSpecification.build(req);

        Page<Assessment> page = repository.findAll(spec, pageable);

        return page.map(this::mapToSummaryDto);
    }

    // ================= DTO MAPPING =================
    private AssessmentResponse mapToDetailDto(Assessment a) {

        return AssessmentResponse.builder()
                .id(a.getId())
                .ailmentCode(a.getAilmentCode())
                .data(a.getAssessmentData())
                .followupStatus(a.getFollowupStatus())
                .lastFollowupDate(a.getLastFollowupDate())
                .pdfUrl(a.getPdfUrl() != null ? a.getPdfUrl() : "")
                .createdAt(a.getCreatedAt())
                .build();
    }

    private AssessmentSummaryResponse mapToSummaryDto(Assessment a) {

        JsonNode patient = a.getAssessmentData().path("patient");

        String firstName = patient.path("firstName").asText("");
        String lastName = patient.path("lastName").asText("");

        boolean overdue = false;
        long overdueDays = 0;

        if (a.getLastFollowupDate() != null) {
            overdueDays = Duration.between(
                    a.getLastFollowupDate(),
                    Instant.now()
            ).toDays();

            overdue = overdueDays > 14;
        }

        return AssessmentSummaryResponse.builder()
                .id(a.getId())
                .ailmentCode(a.getAilmentCode())
                .patientFirstName(firstName)
                .patientLastName(lastName)
                .followupStatus(a.getFollowupStatus())
                .createdAt(a.getCreatedAt())
                .overdue(overdue)
                .overdueDays(overdueDays)
                .build();
    }

    private Pageable buildPageable(AssessmentFilterRequest req) {

        String sortField =
                SORT_FIELD_MAP.getOrDefault(req.getSortBy(), "createdAt");

        Sort.Direction direction =
                "ASC".equalsIgnoreCase(req.getSortDirection())
                        ? Sort.Direction.ASC
                        : Sort.Direction.DESC;

        return PageRequest.of(
                req.getPage(),
                req.getSize(),
                Sort.by(direction, sortField)
        );
    }
}


