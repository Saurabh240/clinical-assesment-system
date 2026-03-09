package com.clinical.dto;

import lombok.Data;

@Data
public class AdminCreatePharmacistRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;


}
