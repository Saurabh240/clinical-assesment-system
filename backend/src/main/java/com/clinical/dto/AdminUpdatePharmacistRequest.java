package com.clinical.dto;

import com.clinical.model.UserStatus;
import lombok.Data;

public record AdminUpdatePharmacistRequest (

     String firstName,
     String lastName,
     UserStatus status)

{}
