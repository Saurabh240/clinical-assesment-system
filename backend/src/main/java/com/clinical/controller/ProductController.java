package com.clinical.controller;

import com.clinical.config.PaginationProperties;
import com.clinical.dto.ProductListRequest;
import com.clinical.dto.ProductPageResponse;
import com.clinical.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final PaginationProperties paginationProperties;

    @GetMapping
    public ProductPageResponse listProducts(
            @ModelAttribute ProductListRequest request
    ) {
        int resolvedPage = (request.page() != null)
                ? request.page()
                : paginationProperties.getDefaultPage();

        int resolvedSize = (request.size() != null)
                ? Math.min(request.size(), paginationProperties.getMaxSize())
                : paginationProperties.getDefaultSize();

        return productService.getProducts(
                request.search(),
                request.ailment(),
                request.category(),
                request.brand(),
                resolvedPage,
                resolvedSize,
                request.sortBy(),
                request.sortDir()
        );
    }
}
