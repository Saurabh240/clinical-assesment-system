package com.clinical.dto;

public record ProductListRequest(
        String search,
        String ailment,
        String category,
        String brand,
        Integer page,
        Integer size,
        String sortBy,
        String sortDir
) {

    public ProductListRequest {
        if (sortBy == null || sortBy.isBlank()) {
            sortBy = "name";
        }
        if (sortDir == null || sortDir.isBlank()) {
            sortDir = "asc";
        }
    }
}
