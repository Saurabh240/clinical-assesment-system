package com.clinical.userManagement.controller;

import com.clinical.userManagement.dto.*;
import com.clinical.userManagement.repository.PharmacyRepository;
import com.clinical.userManagement.repository.UserRepository;
import com.clinical.userManagement.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    UserRepository userRepository;

    PharmacyRepository pharmacyRepository;

    PasswordEncoder passwordEncoder;

    AuthService authService;

    public AuthController(UserRepository userRepository, PharmacyRepository pharmacyRepository, PasswordEncoder passwordEncoder, AuthService authService) {
        this.userRepository = userRepository;
        this.pharmacyRepository = pharmacyRepository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @PostMapping("/signIn")
    public LoginResponse signIn(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse httpServletResponse){

        return authService.login(loginRequest, httpServletResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody TokenRequest tokenRequest){

        TokenResponse tokenResponse=authService.getRefreshToken(tokenRequest);

        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/signUp")
    public SignupResponse signUp(@Valid @RequestBody SignupRequest signupRequest){

        return authService.signUp(signupRequest);
    }
}
