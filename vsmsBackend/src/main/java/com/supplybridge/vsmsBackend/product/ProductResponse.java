package com.supplybridge.vsmsBackend.product;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String name,
        BigDecimal price,
        Integer stock,
        Category category,
        String city,
        String description,
        Long supplierId,
        String supplierBusinessName
) {
    public static ProductResponse from(Product p) {
        return new ProductResponse(
                p.getId(), p.getName(), p.getPrice(), p.getStock(), p.getCategory(),
                p.getCity(), p.getDescription(), p.getSupplier().getId(), p.getSupplier().getBusinessName());
    }
}