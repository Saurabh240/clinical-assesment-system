package com.clinical.service;


import com.clinical.dto.AdminCreatePharmacistRequest;
import com.clinical.dto.AdminUpdatePharmacistRequest;
import com.clinical.dto.UserResponse;
import com.clinical.model.Role;
import com.clinical.model.User;
import com.clinical.model.UserStatus;
import com.clinical.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    /* ---------------- CREATE PHARMACIST ---------------- */

    public UserResponse createPharmacist(AdminCreatePharmacistRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setPassword(passwordEncoder.encode(req.getPassword()));

        user.setRole(Role.PHARMACIST);
        user.setStatus(UserStatus.ACTIVE);

       User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getStatus(),
                savedUser.getFirstName(),
                savedUser.getLastName()
        );
    }

    /* ---------------- UPDATE PHARMACIST ---------------- */

    public UserResponse updatePharmacist(Long userId, AdminUpdatePharmacistRequest req) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

     // only PHARMACIST update allowed
        if (user.getRole() != Role.PHARMACIST) {
            throw new RuntimeException("Only pharmacist users can be updated");
        }

        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setStatus(req.getStatus());

        User updatedUser = userRepository.save(user);
        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getEmail(),
                updatedUser.getRole(),
                updatedUser.getStatus(),
                updatedUser.getFirstName(),
                updatedUser.getLastName()
        );
    }

    /* ---------------- SOFT DELETE PHARMACIST ---------------- */
    @Transactional
    public void softDeletePharmacist(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() != Role.PHARMACIST) {
            throw new RuntimeException("Only pharmacist users can be deleted");
        }

        user.setStatus(UserStatus.INACTIVE);
        userRepository.save(user);
    }

}
