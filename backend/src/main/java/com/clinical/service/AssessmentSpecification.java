package com.clinical.service;

import com.clinical.dto.AssessmentFilterRequest;
import com.clinical.model.Assessment;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class AssessmentSpecification {

    public static Specification<Assessment> build(AssessmentFilterRequest req) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

//            if (req.getPatientName() != null) {
//                predicates.add(
//                        cb.like(
//                                cb.lower(root.get("patientName")),
//                                "%" + req.getPatientName().toLowerCase() + "%"
//                        )
//                );
//            }

            if (req.getAilmentCode() != null) {
                predicates.add(
                        cb.equal(root.get("ailment"), req.getAilmentCode())
                );
            }

            if (req.getStatus() != null) {
                predicates.add(
                        cb.equal(root.get("status"), req.getStatus())
                );
            }

            if (req.getDateFrom() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("createdAt"),
                                req.getDateFrom().atStartOfDay()
                        )
                );
            }

            if (req.getDateTo() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("createdAt"),
                                req.getDateTo().atTime(23, 59, 59)
                        )
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
