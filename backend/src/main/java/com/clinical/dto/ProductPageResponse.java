package com.clinical.dto;

import lombok.*;
import org.springframework.data.domain.Page;
import java.util.List;

@Data
@AllArgsConstructor
public class ProductPageResponse {
    private List<ProductResponse> data;
    private Meta meta;

    @Data
    @AllArgsConstructor
    public static class Meta {
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
        private boolean hasNext;
        private boolean hasPrevious;
    }

    public static ProductPageResponse from(Page<ProductResponse> page) {
        return new ProductPageResponse(
                page.getContent(),
                new Meta(
                        page.getNumber(),
                        page.getSize(),
                        page.getTotalElements(),
                        page.getTotalPages(),
                        page.hasNext(),
                        page.hasPrevious()
                )
        );
    }
}
