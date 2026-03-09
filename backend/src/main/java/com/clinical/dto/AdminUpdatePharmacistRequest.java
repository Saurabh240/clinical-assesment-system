package com.clinical.dto;

import com.clinical.model.UserStatus;
import lombok.Data;

@Data
public class AdminUpdatePharmacistRequest {

    private String firstName;
    private String lastName;
    private UserStatus status;

}
