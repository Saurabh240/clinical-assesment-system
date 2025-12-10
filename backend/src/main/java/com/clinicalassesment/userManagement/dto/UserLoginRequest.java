package com.clinicalassesment.userManagement.dto;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String email;
    private String password;
}
