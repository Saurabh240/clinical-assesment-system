package com.clinical_assesment.userManagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="pharmacy")
@Data
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String address;

    @NotNull
    @Pattern(regexp = "^\\+?[0-9\\- ]{7,15}$",message = "Invalid phone number format")
    private String phone;

    @NotNull
    @Pattern(regexp = "^\\+?[0-9()\\- ]{7,20}$",message = "Invalid fax number")
    private String fax;

    private String logoUrl;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus subscriptionStatus;

    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt=LocalDateTime.now();
    }
}
