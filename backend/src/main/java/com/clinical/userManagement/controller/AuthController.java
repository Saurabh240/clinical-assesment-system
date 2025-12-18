package com.clinical.userManagement.controller;

import com.clinical.config.JwtUtil;
import com.clinical.config.MyUserDetails;
import com.clinical.userManagement.dto.UserLoginRequest;
import com.clinical.userManagement.dto.UserSignupRequest;
import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.Role;
import com.clinical.userManagement.model.SubscriptionStatus;
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
import org.springframework.web.bind.annotation.*;

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

        Users newUser=new Users();
        newUser.setEmail(userSignupRequest.email());
        newUser.setPassword(passwordEncoder.encode(userSignupRequest.password()));
        newUser.setRole(Set.of(Role.PHARMACIST));

        return userRepo.save(newUser);
    }

    @PutMapping("/registerPharmacy")
    public Users registerPharmacy(@RequestBody Pharmacy pharmacy,Authentication authentication) {
        String username = authentication.getName();
        Users user = userRepo.findByEmail(username);
        if (user == null) {
            throw new RuntimeException("User not found with this email ");
        }
        Pharmacy newPharma = null;
        if (!pharmaRepo.existsByName(pharmacy.getName())) {
            if(pharmacy.getSubscriptionStatus()==null){
                pharmacy.setSubscriptionStatus(SubscriptionStatus.INACTIVE);
            }
            newPharma = pharmaRepo.save(pharmacy);
        }else{
            newPharma=pharmaRepo.getByName(pharmacy.getName());
        }
        user.setPharmacy(newPharma);
        return userRepo.save(user);
    }

    @GetMapping("/getAllPharma")
    public List<Pharmacy> getAllPharma(){
        return pharmaRepo.findAll();
    }
}
