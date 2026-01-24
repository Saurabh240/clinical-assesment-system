package com.clinical.service;

import com.clinical.dto.AssessmentFilterRequest;
import com.clinical.model.Assessment;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class AssessmentSpecification {

    public static Specification<Assessment> build(AssessmentFilterRequest req) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (req.getAilmentCode() != null) {
                predicates.add(
                        cb.equal(root.get("ailmentCode"), req.getAilmentCode())
                );
            }

            if (req.getFollowupStatus() != null) {
                predicates.add(
                        cb.equal(root.get("followupStatus"), req.getFollowupStatus())
                );
            }

            if (req.getDateFrom() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("createdAt"),
                                req.getDateFrom()
                        )
                );
            }

            if (req.getDateTo() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("createdAt"),
                                req.getDateTo()
                        )
                );
            }

            if (req.getPatientName() != null && !req.getPatientName().isBlank()) {

                Expression<String> firstName =
                        cb.function(
                                "jsonb_extract_path_text",
                                String.class,
                                root.get("assessmentData"),
                                cb.literal("patient"),
                                cb.literal("firstName")
                        );

                Expression<String> lastName =
                        cb.function(
                                "jsonb_extract_path_text",
                                String.class,
                                root.get("assessmentData"),
                                cb.literal("patient"),
                                cb.literal("lastName")
                        );

                Predicate firstNameLike =
                        cb.like(cb.lower(firstName),
                                "%" + req.getPatientName().toLowerCase() + "%");

                Predicate lastNameLike =
                        cb.like(cb.lower(lastName),
                                "%" + req.getPatientName().toLowerCase() + "%");

                predicates.add(cb.or(firstNameLike, lastNameLike));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

