package com.clinical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "followups")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowUp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Assessment assessment;

    @Column(nullable = false)
    private String notes;

    private Instant nextFollowupDate;

    @Enumerated(EnumType.STRING)
    private FollowupStatus status;

    private Instant updatedAt;
    private String updatedBy;
}

