package com.supplybridge.vsmsBackend.order;

import java.math.BigDecimal;
import java.time.Instant;

public record OrderResponse(
        Long id,
        String productName,
        String supplierBusinessName,
        String vendorBusinessName,
        Integer quantity,
        BigDecimal pricePerUnit,
        BigDecimal totalAmount,
        OrderStatus status,
        Instant createdAt
) {
    public static OrderResponse from(Order o) {
        return new OrderResponse(
                o.getId(), o.getProduct().getName(), o.getSupplier().getBusinessName(),
                o.getVendor().getBusinessName(), o.getQuantity(), o.getPricePerUnit(),
                o.getTotalAmount(), o.getStatus(), o.getCreatedAt());
    }
}