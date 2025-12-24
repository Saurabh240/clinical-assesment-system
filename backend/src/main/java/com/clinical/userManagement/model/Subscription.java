package com.clinical.userManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stripeSubscriptionId;
    private SubscriptionPlan plan;

    private Instant startDate;
    private Instant endDate;

    private SubscriptionStatus status;

    @OneToOne
    private Pharmacy pharmacy;
}
