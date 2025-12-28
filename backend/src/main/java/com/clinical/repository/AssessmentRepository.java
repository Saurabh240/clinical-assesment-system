package com.clinical.repository;

import com.clinical.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssessmentRepository
        extends JpaRepository<Assessment, Long> {
}
