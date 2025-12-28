package com.clinical.repository;

import com.clinical.model.Pharmacy;
import com.clinical.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByPharmacy(Pharmacy pharmacy);
    boolean existsByPharmacy(Pharmacy pharmacy);
}