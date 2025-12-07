package com.clinical_assesment.userManagement.repository;

import com.clinical_assesment.userManagement.model.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmaRepo extends JpaRepository<Pharmacy,Long> {
    Boolean existsById(long id);
    Pharmacy getById(Long id);
    Boolean existsByName(String name);
    Pharmacy getByName(String name);
}
