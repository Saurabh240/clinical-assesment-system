package com.clinical.userManagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="pharmacy")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    @Pattern(regexp = "^\\+?[0-9\\- ]{7,15}$",message = "Invalid phone number format")
    private String phone;


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

    public Pharmacy(String name, String address, String phone, String fax, String logoUrl, SubscriptionStatus subscriptionStatus, LocalDateTime createdAt) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.fax = fax;
        this.logoUrl = logoUrl;
        this.subscriptionStatus = subscriptionStatus;
        this.createdAt = createdAt;
    }
}
