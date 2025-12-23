package com.clinical.userManagement.controller;

import com.clinical.userManagement.dto.PharmacyRequest;
import com.clinical.userManagement.dto.PharmacyResponse;
import com.clinical.userManagement.dto.UserResponse;
import com.clinical.userManagement.service.PharmaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pharma")
public class PharmaController {

    PharmaService pharmaService;

    public PharmaController(PharmaService pharmaService) {
        this.pharmaService = pharmaService;
    }

    @PutMapping("/registerPharmacy")
    public ResponseEntity<UserResponse> registerPharmacy(@Valid @RequestBody PharmacyRequest pharmacyRequest, Authentication authentication) {

        UserResponse updatedUserResponse = pharmaService.registerPharmacy(pharmacyRequest,authentication);

        return ResponseEntity.ok(updatedUserResponse);
    }

    @GetMapping("/getAllPharma")
    public ResponseEntity<List<PharmacyResponse>> getAllPharma(){

        List<PharmacyResponse> allPharma = pharmaService.getAllPharma();

        return ResponseEntity.ok(allPharma);

    }

}
