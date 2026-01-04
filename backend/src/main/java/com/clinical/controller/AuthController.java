package com.clinical.controller;

import com.clinical.dto.*;
import com.clinical.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signIn")
    public ResponseEntity<LoginResponse> signIn(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) throws InvalidCredentialsException {

        return ResponseEntity.ok(authService.login(request, response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(
            @Valid @RequestBody TokenRequest request) {

        return ResponseEntity.ok(
                authService.refresh(request.refreshToken())
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(Authentication authentication) {
        authService.logout(authentication);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/signUp")
    public ResponseEntity<SignupResponse> signUp(
            @Valid @RequestBody SignupRequest request) {

        return ResponseEntity.ok(authService.signUp(request));
    }
}
