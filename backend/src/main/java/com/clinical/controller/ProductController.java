package com.clinical.controller;

import com.clinical.config.PaginationProperties;
import com.clinical.dto.ProductPageResponse;
import com.clinical.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final PaginationProperties paginationProperties;

    @GetMapping
    public ProductPageResponse listProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String ailment,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        int resolvedPage = (page != null)
                ? page
                : paginationProperties.getDefaultPage();
        int resolvedSize = (size != null)
                ? Math.min(size, paginationProperties.getMaxSize())
                : paginationProperties.getDefaultSize();
        return productService.getProducts(
                search,
                ailment,
                category,
                brand,
                resolvedPage,
                resolvedSize,
                sortBy,
                sortDir
        );
    }
}
