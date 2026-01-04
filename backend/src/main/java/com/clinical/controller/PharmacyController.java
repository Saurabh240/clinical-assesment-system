package com.clinical.controller;

import com.clinical.dto.*;
import com.clinical.service.PharmacyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pharmacies")
public class PharmacyController {

    PharmacyService pharmacyService;

    public PharmacyController(PharmacyService pharmacyService) {
        this.pharmacyService = pharmacyService;
    }

    @PostMapping("/join")
    public NextStepResponse join(@RequestBody JoinPharmacyRequest request,
                                 Authentication auth) {
        return pharmacyService.joinExisting(request, auth);
    }

    @PostMapping
    public NextStepResponse create(@RequestBody CreatePharmacyRequest request,
                                   Authentication auth) {
        return pharmacyService.createNew(request, auth);
    }

    @GetMapping("/list")
    public ResponseEntity<List<PharmacyResponse>> listPharmacies(){
        List<PharmacyResponse> allPharma = pharmacyService.listPharmacies();
        return ResponseEntity.ok(allPharma);

    }

}
