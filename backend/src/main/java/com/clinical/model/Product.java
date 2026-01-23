package com.clinical.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "products",
        indexes = {
                @Index(name = "idx_products_ailment", columnList = "ailment"),
                @Index(name = "idx_products_category", columnList = "category"),
                @Index(name = "idx_products_brand", columnList = "brand")
        }
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 255)
    private String name;
    @Column(length = 150)
    private String ailment;
    @Column(length = 150)
    private String category;
    @Column(length = 150)
    private String brand;
    @Column(columnDefinition = "TEXT")
    private String description;
}

