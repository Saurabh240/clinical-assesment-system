package com.clinical.repository;

import com.clinical.model.Ailment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AilmentRepository extends JpaRepository<Ailment,Long> {

    Optional<Ailment> findByCode(String code);

    Optional<Ailment> findByName(String name);

}
