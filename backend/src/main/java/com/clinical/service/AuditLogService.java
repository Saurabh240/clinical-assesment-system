package com.clinical.service;

import com.clinical.model.AuditLog;
import com.clinical.model.FollowupStatus;
import com.clinical.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public void log(
            String entity,
            Long entityId,
            String field,
            FollowupStatus oldValue,
            FollowupStatus newValue,
            String updatedBy
    ) {
        auditLogRepository.save(
                AuditLog.builder()
                        .entity(entity)
                        .entityId(entityId)
                        .field(field)
                        .oldValue(oldValue != null ? oldValue.name() : null)
                        .newValue(newValue != null ? newValue.name() : null)
                        .updatedBy(updatedBy)
                        .updatedAt(Instant.now())
                        .build()
        );
    }
}


