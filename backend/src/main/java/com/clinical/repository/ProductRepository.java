package com.clinical.repository;

import com.clinical.model.Product;
import org.springframework.data.jpa.repository.*;

public interface ProductRepository
        extends JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {
}

