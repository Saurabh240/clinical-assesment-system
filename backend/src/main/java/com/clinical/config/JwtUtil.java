package com.clinical.config;

import com.clinical.model.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {

    private final SecretKey accessKey;
    private final SecretKey refreshKey;

    public JwtUtil(
            @Value("${jwt.access-secret}") String accessSecret,
            @Value("${jwt.refresh-secret}") String refreshSecret
    ) {
        this.accessKey = Keys.hmacShaKeyFor(accessSecret.getBytes(StandardCharsets.UTF_8));
        this.refreshKey = Keys.hmacShaKeyFor(refreshSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Long userId, String email, Role role) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("email", email)
                .claim("role", role.name())
                .claim("type", "ACCESS")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
                .signWith(accessKey)
                .compact();
    }

    public String generateRefreshToken(Long userId, UUID tokenId) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setId(tokenId.toString())
                .claim("type", "REFRESH")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000))
                .signWith(refreshKey)
                .compact();
    }

    public Claims parseAccessToken(String token) {
        return parse(token, accessKey, "ACCESS");
    }

    public Claims parseRefreshToken(String token) {
        return parse(token, refreshKey, "REFRESH");
    }

    private Claims parse(String token, SecretKey key, String expectedType) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        if (!expectedType.equals(claims.get("type"))) {
            throw new JwtException("Invalid token type");
        }
        return claims;
    }
}

