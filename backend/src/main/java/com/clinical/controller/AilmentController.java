package com.clinical.controller;

import com.clinical.dto.AilmentRequest;
import com.clinical.dto.AilmentResponse;
import com.clinical.service.AilmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ailments")
@RequiredArgsConstructor
public class AilmentController {

    private final AilmentService ailmentService;

    @GetMapping
    public ResponseEntity<?> getAllAilments(){
        return ResponseEntity.ok(ailmentService.getAllAilments());
    }

    @PostMapping
    @PreAuthorize("hasRole('PHARMACY_ADMIN')")
    public ResponseEntity<?> createOrUpdateAilment(
            @Valid
            @RequestBody AilmentRequest ailmentRequest){
        return ResponseEntity.ok(ailmentService.createOrUpdateAilment(ailmentRequest));
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> getAilment(@PathVariable @Valid String code){
        AilmentResponse ailmentResponse = ailmentService.getAilment(code);
        return ResponseEntity.ok(ailmentResponse);
    }
}
