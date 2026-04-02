package com.clinical.controller;

import com.clinical.dto.AdminCreatePharmacistRequest;
import com.clinical.dto.AdminUpdatePharmacistRequest;
import com.clinical.dto.AuthUser;
import com.clinical.dto.UserResponse;
import com.clinical.model.Pharmacy;
import com.clinical.model.User;
import com.clinical.repository.UserRepository;
import com.clinical.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @Autowired
    private UserRepository userRepository;

    /* ── helper: resolve the calling admin's Pharmacy (throws if not linked) ── */
    private Pharmacy resolvePharmacy(Authentication auth) {
        AuthUser principal = (AuthUser) auth.getPrincipal();
        User admin = userRepository.findByEmail(principal.email())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        if (admin.getPharmacy() == null) {
            throw new RuntimeException("Admin is not linked to any pharmacy");
        }
        return admin.getPharmacy();
    }

    /* ---------------- LIST PHARMACISTS (scoped to pharmacy) ---------------- */
    @GetMapping
    public ResponseEntity<List<UserResponse>> listPharmacists(Authentication auth) {
        Pharmacy pharmacy = resolvePharmacy(auth);
        return ResponseEntity.ok(adminUserService.listPharmacists(pharmacy.getId()));
    }

    /* ---------------- CREATE PHARMACIST ---------------- */
    @PostMapping
    public ResponseEntity<UserResponse> createPharmacist(
            @RequestBody AdminCreatePharmacistRequest req,
            Authentication auth) {

        Pharmacy pharmacy = resolvePharmacy(auth);
        return ResponseEntity.ok(adminUserService.createPharmacist(req, pharmacy));
    }

    /* ---------------- UPDATE PHARMACIST ---------------- */
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updatePharmacist(
            @PathVariable Long id,
            @RequestBody AdminUpdatePharmacistRequest req,
            Authentication auth) {

        Pharmacy pharmacy = resolvePharmacy(auth);
        return ResponseEntity.ok(adminUserService.updatePharmacist(id, req, pharmacy.getId()));
    }

    /* ---------------- SOFT DELETE ---------------- */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePharmacist(
            @PathVariable Long id,
            Authentication auth) {

        Pharmacy pharmacy = resolvePharmacy(auth);
        adminUserService.softDeletePharmacist(id, pharmacy.getId());
        return ResponseEntity.noContent().build();
    }
}