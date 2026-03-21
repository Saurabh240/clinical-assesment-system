package com.clinical.model;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "assessments")
@Data
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ailmentCode;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private JsonNode assessmentData;

    private Instant lastFollowupDate;

    @Enumerated(EnumType.STRING)
    private FollowupStatus followupStatus;

    private String pdfUrl;

    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;
}

