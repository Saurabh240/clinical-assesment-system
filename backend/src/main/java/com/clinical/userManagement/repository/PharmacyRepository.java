package com.clinical.userManagement.repository;

import com.clinical.userManagement.model.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy,Long> {

    Boolean existsByName(String name);

    Pharmacy getByName(String name);

    Optional<Pharmacy> findByStripeCustomerId(String stripeCustomerId);

}
