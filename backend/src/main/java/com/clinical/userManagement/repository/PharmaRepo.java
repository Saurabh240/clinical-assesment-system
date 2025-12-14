package com.clinical.userManagement.repository;

import com.clinical.userManagement.model.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmaRepo extends JpaRepository<Pharmacy,Long> {

    Boolean existsByName(String name);

    Pharmacy getByName(String name);

}
