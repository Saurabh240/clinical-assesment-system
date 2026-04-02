package com.clinical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Resource type: ASSESSMENT, USER, PHARMACY, FOLLOWUP, PDF */
    private String entity;

    /** ID of the affected resource */
    private Long entityId;

    /**
     * Action: CREATE, UPDATE, DELETE, LOGIN, LOGOUT,
     * PDF_GENERATED, STATUS_CHANGE
     */
    private String action;

    /** Field that changed (for field-level diffs) */
    private String field;

    private String oldValue;
    private String newValue;

    /** Human-readable summary shown in the Details column */
    @Column(columnDefinition = "TEXT")
    private String details;

    /** Email or display name of the actor */
    private String updatedBy;

    /** Client IP captured from the HTTP request */
    @Column(length = 45)
    private String ipAddress;

    private Instant updatedAt;
}
