package com.clinical.userManagement.service;

import com.clinical.config.JwtUtil;
import com.clinical.config.MyUserDetails;
import com.clinical.userManagement.dto.*;
import com.clinical.userManagement.exception.InvalidCredentialsException;
import com.clinical.userManagement.exception.InvalidJwtTokenException;
import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.Role;
import com.clinical.userManagement.model.SubscriptionStatus;
import com.clinical.userManagement.model.Users;
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

    public UserResponse registerPharmacy(PharmacyRequest pharmacyRequest,Authentication authentication){

        String username = authentication.getName();

        Users user = userRepo.findByEmail(username);

        if(user==null){
            throw new UsernameNotFoundException("User don't exist! First login properly");
        }

        Pharmacy newPharma = null;

        if(!pharmaRepo.existsByName(pharmacyRequest.name())){

            newPharma = new Pharmacy(
                    pharmacyRequest.name(),
                    pharmacyRequest.address(),
                    pharmacyRequest.phone(),
                    pharmacyRequest.fax(),
                    pharmacyRequest.logoUrl(),
                    SubscriptionStatus.INACTIVE,
                    LocalDateTime.now()
                    );

            newPharma = pharmaRepo.save(newPharma);

        }else{

            newPharma = pharmaRepo.getByName(newPharma.getName());

        }

        user.setPharmacy(newPharma);

        Users savedUser = userRepo.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getPharmacy(),
                savedUser.getEmail(),
                savedUser.getPassword(),
                savedUser.getRole(),
                savedUser.getCreatedAt()
        );
    }

    public List<PharmacyResponse> getAllPharma(){

        List<Pharmacy> allPharma = pharmaRepo.findAll();

        return allPharma.stream().map(this::mapper).toList();
    }

    private PharmacyResponse mapper(Pharmacy pharmacy){

        return new PharmacyResponse(
                pharmacy.getId(),
                pharmacy.getName(),
                pharmacy.getAddress(),
                pharmacy.getPhone(),
                pharmacy.getFax(),
                pharmacy.getLogoUrl(),
                pharmacy.getSubscriptionStatus(),
                pharmacy.getCreatedAt()
        );

    }
}
