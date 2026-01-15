package com.clinical.service;

import com.clinical.dto.AssessmentFilterRequest;
import com.clinical.model.Assessment;
import com.clinical.repository.AssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AssessmentRepository repository;

    private static final Map<String, String> SORT_FIELD_MAP = Map.of(
            "date", "createdAt",
            "ailment", "ailment",
            "patient", "patientName"
    );

    public Page<Assessment> getAssessments(AssessmentFilterRequest req) {

        Pageable pageable = buildPageable(req);
        Specification<Assessment> spec =
                AssessmentSpecification.build(req);

        return repository.findAll(spec, pageable);
    }

    public Pageable buildPageable(AssessmentFilterRequest req) {

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
