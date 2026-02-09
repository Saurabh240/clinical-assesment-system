package com.clinical.dto;

public record ProductResponse (
     Long id,
     String name,
     String ailment,
     String category,
     String brand,
     String description)
    {}