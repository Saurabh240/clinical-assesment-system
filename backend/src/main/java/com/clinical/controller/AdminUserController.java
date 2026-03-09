package com.clinical.controller;


import com.clinical.dto.AdminCreatePharmacistRequest;
import com.clinical.dto.AdminUpdatePharmacistRequest;
import com.clinical.model.Role;
import com.clinical.model.User;
import com.clinical.model.UserStatus;
import com.clinical.repository.UserRepository;
import com.clinical.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/users")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /* ---------------- CREATE PHARMACIST ---------------- */
    @PostMapping
    public User createPharmacist(@RequestBody AdminCreatePharmacistRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());

        user.setRole(Role.PHARMACIST);
        user.setStatus(UserStatus.ACTIVE);

        return userRepository.save(user);

    }

    /* ---------------- UPDATE USER ---------------- */
    @PutMapping("/{id}")
    public User updatePharmacist(
            @PathVariable Long id,
            @RequestBody AdminUpdatePharmacistRequest req
    ) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setStatus(req.getStatus());

        return userRepository.save(user);
    }

    /* ---------------- SOFT DELETE ---------------- */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        adminUserService.softDeletePharmacist(id);
        return ResponseEntity.noContent().build();
    }


}