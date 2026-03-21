package com.clinical.service;

import com.clinical.config.JwtUtil;
import com.clinical.dto.*;
import com.clinical.model.*;
import com.clinical.repository.RefreshTokenRepository;
import com.clinical.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import static org.apache.commons.codec.digest.DigestUtils.sha256Hex;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public SignupResponse signUp(SignupRequest signupRequest){

        if(userRepository.existsByEmail(signupRequest.email())){
            throw new RuntimeException("User with this email already exists! "+ signupRequest.email());
        }

        User newUser = new User();
        newUser.setEmail(signupRequest.email());
        newUser.setFirstName(signupRequest.firstName());
        newUser.setLastName(signupRequest.lastName());
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

    @Transactional
    public LoginResponse login(LoginRequest req, HttpServletResponse response) throws InvalidCredentialsException {

        User user = userRepository.findByEmail(req.email())
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        refreshTokenRepository.deleteAllByUserId(user.getId());

        UUID tokenId = UUID.randomUUID();
        String refreshJwt = jwtUtil.generateRefreshToken(user.getId(), tokenId);

        RefreshToken rt = new RefreshToken();
        rt.setUserId(user.getId());
        rt.setTokenHash(sha256Hex(refreshJwt));
        rt.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
        refreshTokenRepository.save(rt);

        String accessToken =
                jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole());

        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshJwt)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/auth/refresh")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new LoginResponse(user.getId(), user.getStatus(), resolveNextStep(user), accessToken, user.getRole());
    }

    @Transactional
    public TokenResponse refresh(String refreshToken, HttpServletResponse response) {

        Claims claims = jwtUtil.parseRefreshToken(refreshToken);
        Long userId = Long.valueOf(claims.getSubject());

        String hash = sha256Hex(refreshToken);

        RefreshToken stored = refreshTokenRepository
                .findByTokenHashAndRevokedFalse(hash)
                .orElseThrow(() -> new JwtException("Refresh token revoked"));

        stored.setRevoked(true);

        UUID newTokenId = UUID.randomUUID();
        String newRefreshJwt = jwtUtil.generateRefreshToken(userId, newTokenId);

        RefreshToken newRt = new RefreshToken();
        newRt.setUserId(userId);
        newRt.setTokenHash(sha256Hex(newRefreshJwt));

        newRt.setExpiresAt(Instant.now().plus(7, ChronoUnit.DAYS));
        refreshTokenRepository.save(newRt);

        User user = userRepository.findById(userId).orElseThrow();

        String newAccess =
                jwtUtil.generateAccessToken(user.getId(), user.getEmail(), user.getRole());

        ResponseCookie cookie = ResponseCookie.from("refresh_token", newRefreshJwt)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/auth/refresh")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new TokenResponse(newAccess);
    }

    @Transactional
    public void logout(Authentication authentication) {
        AuthUser authUser = (AuthUser) authentication.getPrincipal();
        refreshTokenRepository.deleteAllByUserId(authUser.userId());
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
