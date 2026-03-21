package com.clinical.controller;

import com.clinical.dto.*;
import com.clinical.service.AuditLogService;
import com.clinical.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final AuditLogService auditLogService;

    @PostMapping("/signIn")
    public ResponseEntity<LoginResponse> signIn(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) throws InvalidCredentialsException {

        LoginResponse res = authService.login(request, httpResponse);

        // Audit successful login
        auditLogService.logLogin(
                res.userId(),
                request.email(),
                resolveIp(httpRequest));

        return ResponseEntity.ok(res);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(
            @Valid @CookieValue("refresh_token") String refreshToken, HttpServletResponse response) {

        return ResponseEntity.ok(
                authService.refresh(refreshToken, response)
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(Authentication authentication,
                                       HttpServletRequest httpRequest) {
        AuthUser authUser = (AuthUser) authentication.getPrincipal();

        auditLogService.logLogout(
                authUser.userId(),
                authUser.email(),
                resolveIp(httpRequest));

        authService.logout(authentication);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/signUp")
    public ResponseEntity<SignupResponse> signUp(
            @Valid @RequestBody SignupRequest request,
            HttpServletRequest httpRequest) {

        SignupResponse res = authService.signUp(request);

        auditLogService.logCreated(
                "USER", res.userId(),
                "Created new pharmacist account",
                request.email(),
                resolveIp(httpRequest));

        return ResponseEntity.ok(res);
    }

    @GetMapping("/currentUser")
    public ResponseEntity<UserContextResponse> getCurrentUser(Authentication authentication) {
        UserContextResponse res = authService.getCurrentUser(authentication);
        return ResponseEntity.ok(res);
    }

    /** Respects X-Forwarded-For for reverse-proxy deployments. */
    private String resolveIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
