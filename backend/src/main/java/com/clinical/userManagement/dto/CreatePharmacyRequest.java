package com.clinical.userManagement.dto;


public record CreatePharmacyRequest(
        String name,
        String address,
        String phone,
        String fax,
        String logoUrl){}

