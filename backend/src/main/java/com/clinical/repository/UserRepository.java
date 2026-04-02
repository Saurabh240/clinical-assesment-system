package com.clinical.repository;

import com.clinical.model.Role;
import com.clinical.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    // Returns all pharmacists that belong to a specific pharmacy (by pharmacy ID)
    List<User> findByPharmacyIdAndRole(Long pharmacyId, Role role);

    // Used to verify a user belongs to a given pharmacy before update/delete
    Optional<User> findByIdAndPharmacyId(Long id, Long pharmacyId);
}
