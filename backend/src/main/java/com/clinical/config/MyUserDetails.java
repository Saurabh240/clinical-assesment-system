package com.clinical.config;

import com.clinical.userManagement.model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class MyUserDetails implements UserDetails {

    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public MyUserDetails(String email,String password,Collection<? extends GrantedAuthority> authorities) {
        this.email=email;
        this.password=password;
        this.authorities=authorities;
    }

    public static MyUserDetails build(Users user){

        List<SimpleGrantedAuthority> authorities = user.getRole()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .toList();

        return new MyUserDetails(
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
