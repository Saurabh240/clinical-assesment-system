package com.clinical.userManagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

//Todo: There is no relation with Users for now | Subscription is also not mapped
@Entity
@Table(name="pharmacy")
@Data
@RequiredArgsConstructor
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

    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    private String stripeCustomerId;

    @OneToMany(mappedBy = "pharmacy")
    private List<User> users;

    @OneToOne(mappedBy = "pharmacy")
    private Subscription subscription;

    @PrePersist
    protected void onCreate(){
        this.createdAt=LocalDateTime.now();
    }
}
