package com.clinical.userManagement.service;

import com.clinical.config.JwtUtil;
import com.clinical.userManagement.dto.*;
import com.clinical.userManagement.model.*;
import com.clinical.userManagement.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public SignupResponse signUp(SignupRequest signupRequest){

        if(userRepository.existsByEmail(signupRequest.email())){
            throw new RuntimeException("User with this email already exists! "+ signupRequest.email());
        }

        User newUser = new User();
        newUser.setEmail(signupRequest.email());
        newUser.setPassword(passwordEncoder.encode(signupRequest.password()));
        newUser.setRole(Role.PHARMACIST);
        newUser.setStatus(UserStatus.PENDING);

        userRepository.save(newUser);

        return new SignupResponse(
                newUser.getId(),
                newUser.getStatus(),
                "PHARMACY_SELECTION"
        );
    }

    public LoginResponse login(LoginRequest loginRequest, HttpServletResponse response){

        User user = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateAccessToken(user.getEmail(), user.getRole());

        ResponseCookie cookie = ResponseCookie.from("access_token", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new LoginResponse(
                user.getId(),
                user.getStatus(),
                resolveNextStep(user)
        );
    }


    public TokenResponse getRefreshToken(TokenRequest tokenRequest){

        String refreshToken = tokenRequest.refreshToken();

        String email = jwtUtil.extractClaims(refreshToken).getSubject();

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isEmpty()){
            throw new UsernameNotFoundException("User with this email not found! -> "+email);
        }

        String newAccessToken = jwtUtil.generateAccessToken(email, optionalUser.get().getRole());

        return new TokenResponse(newAccessToken,refreshToken);

    }

    public UserContextResponse getCurrentUser(Authentication auth) {
        AuthUser authUser = (AuthUser) auth.getPrincipal();
        User user = userRepository
                .findByEmail(authUser.email())
                .orElseThrow();
        return UserContextResponse.from(user);
    }

    private String resolveNextStep(User user) {
        if (user.getPharmacy() == null) return "PHARMACY_SELECTION";
        if (user.getPharmacy().getSubscription() == null) return "SUBSCRIPTION";
        return "DASHBOARD";
    }
}
