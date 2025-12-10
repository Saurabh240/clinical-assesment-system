package com.clinicalassesment.userManagement.dto;

import lombok.Data;

@Data
public class PharmacyRequest {
    private String name;
    private String address;
    private String phone;
    private String fax;
    private String logoUrl;
}
