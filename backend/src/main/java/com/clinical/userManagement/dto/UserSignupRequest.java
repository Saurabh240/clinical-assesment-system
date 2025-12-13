package com.clinical.userManagement.dto;

import lombok.Data;

public record UserSignupRequest(String email,String password,PharmacyRequest pharmacy){}
