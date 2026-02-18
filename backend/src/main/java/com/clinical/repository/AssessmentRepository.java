package com.clinical.repository;

import com.clinical.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface AssessmentRepository
        extends JpaRepository<Assessment, Long>,
        JpaSpecificationExecutor<Assessment> {
    List<Assessment> findByLastFollowupDateBeforeOrLastFollowupDateIsNull(Instant thresholdDate);
}
