package com.clinical.userManagement.dto;

import lombok.Data;

public record UserLoginRequest(String email,String password){}
