package com.clinical_assesment.userManagement.dto;

import lombok.Data;

@Data
public class UserSignupRequest {
    private String email;
    private String password;
    private PharmacyRequest pharmacy;
}
