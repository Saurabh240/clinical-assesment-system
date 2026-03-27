package com.clinical.dto;

public record AdminCreatePharmacistRequest (

     String email,
     String password,
     String firstName,
     String lastName)
{}
