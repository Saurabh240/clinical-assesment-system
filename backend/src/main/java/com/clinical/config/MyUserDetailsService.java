/*
package com.clinical.config;

import com.clinical.userManagement.model.User;
import com.clinical.userManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("Inside loadUserByUsername(String email) method");

        Optional<User> user= userRepository.findByEmail(email);

        if(user.isEmpty()){
            throw new UsernameNotFoundException("User with this email not found! -> "+email);
        }


        return MyUserDetails.build(user.get());
    }
}
*/
