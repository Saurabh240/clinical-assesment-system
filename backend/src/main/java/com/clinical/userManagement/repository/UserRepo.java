package com.clinical.userManagement.repository;

import com.clinical.userManagement.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users,Long> {

    Users findByEmail(String email);

    Boolean existsByEmail(String email);
}
