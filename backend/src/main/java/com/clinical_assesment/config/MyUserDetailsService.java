package com.clinical_assesment.config;

import com.clinical_assesment.userManagement.model.Users;
import com.clinical_assesment.userManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("Inside loadUserByUsername(String email) method");

        Users user=userRepo.findByEmail(email);

        if(user==null){
            throw new UsernameNotFoundException("User with this email not found! -> "+email);
        }


        return MyUserDetails.build(user);
    }
}
