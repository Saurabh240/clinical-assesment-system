package com.clinical.service;

import com.clinical.dto.ProductPageResponse;
import com.clinical.dto.ProductResponse;
import com.clinical.model.Product;
import com.clinical.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import static com.clinical.specifications.ProductSpecification.*;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductPageResponse getProducts(
            String search,
            String ailment,
            String category,
            String brand,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {

        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Product> spec = Specification
                .where(search(search))
                .and(ailment(ailment))
                .and(category(category))
                .and(brand(brand));

        Page<Product> productPage =
                productRepository.findAll(spec, pageable);

        Page<ProductResponse> responsePage =
                productPage.map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getAilment(),
                        p.getCategory(),
                        p.getBrand(),
                        p.getDescription()
                ));


        return ProductPageResponse.from(responsePage);
    }
}


