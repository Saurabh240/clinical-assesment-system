package com.clinical.service;

import com.clinical.dto.AdminCreatePharmacistRequest;
import com.clinical.dto.AdminUpdatePharmacistRequest;
import com.clinical.dto.UserResponse;
import com.clinical.model.Pharmacy;
import com.clinical.model.Role;
import com.clinical.model.User;
import com.clinical.model.UserStatus;
import com.clinical.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* ---------------- LIST PHARMACISTS (scoped to pharmacy) ---------------- */

    public List<UserResponse> listPharmacists(Long pharmacyId) {
        return userRepository.findByPharmacyIdAndRole(pharmacyId, Role.PHARMACIST)
                .stream()
                .map(u -> new UserResponse(
                        u.getId(),
                        u.getEmail(),
                        u.getRole(),
                        u.getStatus(),
                        u.getFirstName(),
                        u.getLastName()))
                .collect(Collectors.toList());
    }

    /* ---------------- CREATE PHARMACIST (scoped to pharmacy) ---------------- */

    public UserResponse createPharmacist(AdminCreatePharmacistRequest req, Pharmacy pharmacy) {

        if (userRepository.existsByEmail(req.email())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(req.email());
        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(Role.PHARMACIST);
        user.setStatus(UserStatus.ACTIVE);
        // Assign the new pharmacist to the same pharmacy as the admin
        user.setPharmacy(pharmacy);

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getStatus(),
                savedUser.getFirstName(),
                savedUser.getLastName());
    }

    /* ---------------- UPDATE PHARMACIST (scoped to pharmacy) ---------------- */

    public UserResponse updatePharmacist(Long userId, AdminUpdatePharmacistRequest req, Long pharmacyId) {

        // findByIdAndPharmacyId ensures the pharmacist belongs to this admin's pharmacy
        User user = userRepository.findByIdAndPharmacyId(userId, pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacist not found in your pharmacy"));

        if (user.getRole() != Role.PHARMACIST) {
            throw new RuntimeException("Only pharmacist users can be updated");
        }

        user.setFirstName(req.firstName());
        user.setLastName(req.lastName());
        user.setStatus(req.status());

        User updatedUser = userRepository.save(user);
        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getEmail(),
                updatedUser.getRole(),
                updatedUser.getStatus(),
                updatedUser.getFirstName(),
                updatedUser.getLastName());
    }

    /* ---------------- SOFT DELETE PHARMACIST (scoped to pharmacy) ---------------- */

    @Transactional
    public void softDeletePharmacist(Long userId, Long pharmacyId) {

        User user = userRepository.findByIdAndPharmacyId(userId, pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacist not found in your pharmacy"));

        if (user.getRole() != Role.PHARMACIST) {
            throw new RuntimeException("Only pharmacist users can be deleted");
        }

        user.setStatus(UserStatus.INACTIVE);
        userRepository.save(user);
    }
}