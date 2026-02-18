package com.clinical.repository;

import com.clinical.model.Assessment;
import com.clinical.model.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    Optional<FollowUp> findTopByAssessmentIdOrderByCreatedAtDesc(Long assessmentId);
}



