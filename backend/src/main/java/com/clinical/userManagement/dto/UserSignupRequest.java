package com.clinical.userManagement.dto;

import lombok.Data;

@Data
public class UserSignupRequest {
    private String email;
    private String password;
    private PharmacyRequest pharmacy;
}
