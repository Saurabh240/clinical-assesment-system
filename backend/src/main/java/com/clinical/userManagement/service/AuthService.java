package com.clinical.userManagement.service;

import com.clinical.config.JwtUtil;
import com.clinical.config.MyUserDetails;
import com.clinical.userManagement.dto.*;
import com.clinical.userManagement.exception.InvalidCredentialsException;
import com.clinical.userManagement.exception.InvalidJwtTokenException;
import com.clinical.userManagement.model.*;
import com.clinical.userManagement.repository.PharmaRepo;
import com.clinical.userManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class AuthService {

    private UserRepo userRepo;

    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    private PharmaRepo pharmaRepo;

    public AuthService(UserRepo userRepo, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, PharmaRepo pharmaRepo) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.pharmaRepo = pharmaRepo;
    }

    public UserResponse signUp(UserSignupRequest userSignupRequest){

        if(userRepo.existsByEmail(userSignupRequest.email())){
            throw new RuntimeException("User with this email already exists! "+userSignupRequest.email());
        }

        Users newUser=new Users();
        newUser.setEmail(userSignupRequest.email());
        newUser.setPassword(passwordEncoder.encode(userSignupRequest.password()));
        newUser.setRole(Set.of(Role.PHARMACIST));

        userRepo.save(newUser);

        UserResponse userResponse=new UserResponse(
                newUser.getId(),
                newUser.getPharmacy(),
                newUser.getEmail(),
                newUser.getPassword(),
                newUser.getRole(),
                newUser.getCreatedAt());

        return userResponse;
    }

    public TokenResponse signIn(UserLoginRequest userLoginRequest){

        Authentication authentication;

        authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequest.email(),userLoginRequest.password()));

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        if(authentication.isAuthenticated()){

            SecurityContextHolder.getContext().setAuthentication(authentication);

            List<String> roles=userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            String accessToken = JwtUtil.generateAccessToken(userLoginRequest.email(),roles);

            String refreshToken = JwtUtil.generateRefreshToken(userLoginRequest.email());

            return new TokenResponse(accessToken,refreshToken);
        }
        throw new InvalidCredentialsException("Credentials aren't valid");
    }


    public TokenResponse getRefreshToken(TokenRequest tokenRequest){

        String refreshToken = tokenRequest.refreshToken();

        if (!JwtUtil.validateToken(refreshToken)) {
            throw new InvalidJwtTokenException("JWT refresh token is invalid!");
        }

        String email = JwtUtil.extractClaims(refreshToken).getSubject();

        Users user = userRepo.findByEmail(email);

        if(user==null){
            throw new UsernameNotFoundException("User with this email not found! -> "+email);
        }

        List<String> roles = user.getRole()
                .stream()
                .map(Role::name)
                .toList();

        String newAccessToken = JwtUtil.generateAccessToken(email, roles);

        return new TokenResponse(newAccessToken,refreshToken);

    }

}
