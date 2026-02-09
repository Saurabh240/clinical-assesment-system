package com.clinical.service;

import com.clinical.model.AuditLog;
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
            String oldValue,
            String newValue,
            String updatedBy
    ) {
        AuditLog log = AuditLog.builder()
                .entity(entity)
                .entityId(entityId)
                .field(field)
                .oldValue(oldValue)
                .newValue(newValue)
                .updatedBy(updatedBy)
                .updatedAt(LocalDateTime.now())
                .build();

        auditLogRepository.save(log);
    }
}

