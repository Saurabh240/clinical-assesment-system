package com.clinical_assesment.userManagement.dto;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String email;
    private String password;
}
