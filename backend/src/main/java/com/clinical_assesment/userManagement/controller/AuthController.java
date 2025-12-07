package com.clinical_assesment.userManagement.controller;

import com.clinical_assesment.config.JwtUtil;
import com.clinical_assesment.config.MyUserDetails;
import com.clinical_assesment.userManagement.dto.UserLoginRequest;
import com.clinical_assesment.userManagement.dto.UserSignupRequest;
import com.clinical_assesment.userManagement.model.Pharmacy;
import com.clinical_assesment.userManagement.model.Role;
import com.clinical_assesment.userManagement.model.Users;
import com.clinical_assesment.userManagement.repository.PharmaRepo;
import com.clinical_assesment.userManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepo;

    @Autowired
    PharmaRepo pharmaRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/signIn")
    public Map<String,String> signIn(@RequestBody UserLoginRequest userLoginRequest){

        Authentication authentication;

        authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequest.getEmail(),userLoginRequest.getPassword()));

        MyUserDetails userDetails= (MyUserDetails) authentication.getPrincipal();

        if(authentication.isAuthenticated()){
            SecurityContextHolder.getContext().setAuthentication(authentication);
            List<String> roles=userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();
            String accessToken = JwtUtil.generateAccessToken(userLoginRequest.getEmail(),roles);
            String refreshToken = JwtUtil.generateRefreshToken(userLoginRequest.getEmail());

            Map<String,String> response=new HashMap<>();
            response.put("accessToken",accessToken);
            response.put("refreshToken",refreshToken);
            return response;
        }
        return Map.of("error","Login Failed!");
    }

    @PostMapping("/refresh")
    public Map<String,String> refresh(@RequestBody Map<String,String> request){
        String refreshToken=request.get("refreshToken");
        if (!JwtUtil.validateToken(refreshToken)) {
            return Map.of("error", "Invalid refresh token");
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
        return Map.of(
                "accessToken", newAccessToken,
                "refreshToken", refreshToken
        );
    }

    @PostMapping("/signUp")
    public Users signUp(@RequestBody UserSignupRequest userSignupRequest){

        if(userRepo.existsByEmail(userSignupRequest.getEmail())){
            throw new RuntimeException("User with this email already exists! "+userSignupRequest.getEmail());
        }

        Pharmacy pharmacy;
        if(pharmaRepo.existsByName(userSignupRequest.getPharmacy().getName())){
            pharmacy=pharmaRepo.getByName(userSignupRequest.getPharmacy().getName());
        }else {
            pharmacy=new Pharmacy();
            pharmacy.setName(userSignupRequest.getPharmacy().getName());
            pharmacy.setAddress(userSignupRequest.getPharmacy().getAddress());
            pharmacy.setPhone(userSignupRequest.getPharmacy().getPhone());
            pharmacy.setFax(userSignupRequest.getPharmacy().getFax());
            pharmacy.setLogoUrl(userSignupRequest.getPharmacy().getLogoUrl());
            pharmacy = pharmaRepo.save(pharmacy);
        }

        Users newUser=new Users();
        newUser.setPharmacy(pharmacy);
        newUser.setEmail(userSignupRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(userSignupRequest.getPassword()));
        newUser.setRole(Set.of(Role.PHARMACIST));

        return userRepo.save(newUser);
    }

}
