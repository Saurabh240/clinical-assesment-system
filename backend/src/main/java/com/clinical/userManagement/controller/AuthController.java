package com.clinical.userManagement.controller;

import com.clinical.config.JwtUtil;
import com.clinical.config.MyUserDetails;
import com.clinical.userManagement.dto.*;
import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.Role;
import com.clinical.userManagement.model.SubscriptionStatus;
import com.clinical.userManagement.model.Users;
import com.clinical.userManagement.repository.PharmaRepo;
import com.clinical.userManagement.repository.UserRepo;
import com.clinical.userManagement.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    AuthenticationManager authenticationManager;

    UserRepo userRepo;

    PharmaRepo pharmaRepo;

    PasswordEncoder passwordEncoder;

    AuthService authService;

    public AuthController(AuthenticationManager authenticationManager, UserRepo userRepo, PharmaRepo pharmaRepo, PasswordEncoder passwordEncoder, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.pharmaRepo = pharmaRepo;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @PostMapping("/signIn")
    public ResponseEntity<TokenResponse> signIn(@Valid @RequestBody UserLoginRequest userLoginRequest){

        TokenResponse tokenResponse=authService.signIn(userLoginRequest);

        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody TokenRequest tokenRequest){

        TokenResponse tokenResponse=authService.getRefreshToken(tokenRequest);

        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/signUp")
    public ResponseEntity<UserResponse > signUp(@Valid @RequestBody UserSignupRequest userSignupRequest){

        UserResponse signedUpUser=authService.signUp(userSignupRequest);

        return ResponseEntity.ok(signedUpUser);
    }


}
