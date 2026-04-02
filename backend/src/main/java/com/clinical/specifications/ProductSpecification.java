package com.clinical.specifications;

import com.clinical.model.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    public static Specification<Product> search(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) {
                return cb.conjunction();
            }

            return cb.or(
                    cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + search.toLowerCase() + "%")
            );
        };
    }

    public static Specification<Product> ailment(String ailment) {
        return (root, query, cb) ->
                ailment == null ? cb.conjunction() :
                        cb.equal(root.get("ailment"), ailment);
    }

    public static Specification<Product> category(String category) {
        return (root, query, cb) ->
                category == null ? cb.conjunction() :
                        cb.equal(root.get("category"), category);
    }

    public static Specification<Product> brand(String brand) {
        return (root, query, cb) ->
                brand == null ? cb.conjunction() :
                        cb.equal(root.get("brand"), brand);
    }
}
