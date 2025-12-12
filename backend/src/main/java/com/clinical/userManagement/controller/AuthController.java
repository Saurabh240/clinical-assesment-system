package com.clinical.userManagement.controller;

import com.clinical.config.JwtUtil;
import com.clinical.config.MyUserDetails;
import com.clinical.userManagement.dto.UserLoginRequest;
import com.clinical.userManagement.dto.UserSignupRequest;
import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.Role;
import com.clinical.userManagement.model.Users;
import com.clinical.userManagement.repository.PharmaRepo;
import com.clinical.userManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

        authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequest.email(),userLoginRequest.password()));

        MyUserDetails userDetails= (MyUserDetails) authentication.getPrincipal();

        if(authentication.isAuthenticated()){

            SecurityContextHolder.getContext().setAuthentication(authentication);

            List<String> roles=userDetails.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            String accessToken = JwtUtil.generateAccessToken(userLoginRequest.email(),roles);

            String refreshToken = JwtUtil.generateRefreshToken(userLoginRequest.email());

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

        if(userRepo.existsByEmail(userSignupRequest.email())){
            throw new RuntimeException("User with this email already exists! "+userSignupRequest.email());
        }

        Pharmacy pharmacy;
        if(pharmaRepo.existsByName(userSignupRequest.pharmacy().name())){
            pharmacy=pharmaRepo.getByName(userSignupRequest.pharmacy().name());
        }else {
            pharmacy=new Pharmacy();
            pharmacy.setName(userSignupRequest.pharmacy().name());
            pharmacy.setAddress(userSignupRequest.pharmacy().address());
            pharmacy.setPhone(userSignupRequest.pharmacy().phone());
            pharmacy.setFax(userSignupRequest.pharmacy().fax());
            pharmacy.setLogoUrl(userSignupRequest.pharmacy().logoUrl());
            pharmacy = pharmaRepo.save(pharmacy);
        }

        Users newUser=new Users();
        newUser.setPharmacy(pharmacy);
        newUser.setEmail(userSignupRequest.email());
        newUser.setPassword(passwordEncoder.encode(userSignupRequest.password()));
        newUser.setRole(Set.of(Role.PHARMACIST));

        return userRepo.save(newUser);
    }

    @PostMapping("/testPharmacist")
    @PreAuthorize("hasAnyRole('PHARMACIST')")
    public String testPharmacist(){
        return "Test Pharmacist successful";
    }

    @PostMapping("/testAdmin")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String testAdmin(){
        return "Test Admin successful";
    }

}
