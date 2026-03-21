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

    // ── Generic log (all fields) ──────────────────────────────────────────
    public void log(String entity, Long entityId, String action,
                    String field, String oldValue, String newValue,
                    String details, String updatedBy, String ipAddress) {
        auditLogRepository.save(AuditLog.builder()
                .entity(entity)
                .entityId(entityId)
                .action(action)
                .field(field)
                .oldValue(oldValue)
                .newValue(newValue)
                .details(details)
                .updatedBy(updatedBy)
                .ipAddress(ipAddress)
                .updatedAt(Instant.now())
                .build());
    }

    // ── Convenience: CREATE ───────────────────────────────────────────────
    public void logCreated(String entity, Long entityId,
                           String details, String updatedBy, String ipAddress) {
        log(entity, entityId, "CREATE", null, null, null,
                details, updatedBy, ipAddress);
    }

    // ── Convenience: UPDATE ───────────────────────────────────────────────
    public void logUpdated(String entity, Long entityId,
                           String details, String updatedBy, String ipAddress) {
        log(entity, entityId, "UPDATE", null, null, null,
                details, updatedBy, ipAddress);
    }

    // ── Convenience: DELETE ───────────────────────────────────────────────
    public void logDeleted(String entity, Long entityId,
                           String details, String updatedBy, String ipAddress) {
        log(entity, entityId, "DELETE", null, null, null,
                details, updatedBy, ipAddress);
    }

    // ── Convenience: LOGIN / LOGOUT ───────────────────────────────────────
    public void logLogin(Long userId, String updatedBy, String ipAddress) {
        log("USER", userId, "LOGIN", null, null, null,
                "User logged in", updatedBy, ipAddress);
    }

    public void logLogout(Long userId, String updatedBy, String ipAddress) {
        log("USER", userId, "LOGOUT", null, null, null,
                "User logged out", updatedBy, ipAddress);
    }

    // ── Convenience: STATUS_CHANGE (existing followup use-case) ──────────
    public void logStatusChange(String entity, Long entityId,
                                FollowupStatus oldStatus, FollowupStatus newStatus,
                                String updatedBy, String ipAddress) {
        log(entity, entityId, "STATUS_CHANGE", "followupStatus",
                oldStatus != null ? oldStatus.name() : null,
                newStatus != null ? newStatus.name() : null,
                "Status changed from " + oldStatus + " to " + newStatus,
                updatedBy, ipAddress);
    }

    // ── Convenience: PDF_GENERATED ────────────────────────────────────────
    public void logPdfGenerated(Long assessmentId, String pdfUrl,
                                String updatedBy, String ipAddress) {
        log("ASSESSMENT", assessmentId, "PDF_GENERATED", null, null, pdfUrl,
                "PDF generated for assessment #" + assessmentId,
                updatedBy, ipAddress);
    }
}


