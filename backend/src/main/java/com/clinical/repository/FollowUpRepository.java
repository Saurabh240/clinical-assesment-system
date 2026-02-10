package com.clinical.repository;

import com.clinical.model.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    Optional<FollowUp> findByAssessmentId(Long assessmentId);
}

