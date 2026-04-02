package com.clinical.repository;

import com.clinical.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    @Query("""
        SELECT a FROM AuditLog a
        WHERE (:search IS NULL OR :search = ''
               OR LOWER(a.updatedBy) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(a.entity)    LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(a.details)   LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(a.action)    LIKE LOWER(CONCAT('%', :search, '%')))
          AND (:action IS NULL OR :action = '' OR a.action = :action)
          AND (:entity IS NULL OR :entity = '' OR a.entity = :entity)
        ORDER BY a.updatedAt DESC
        """)
    Page<AuditLog> search(
            @Param("search") String search,
            @Param("action") String action,
            @Param("entity") String entity,
            Pageable pageable);
}