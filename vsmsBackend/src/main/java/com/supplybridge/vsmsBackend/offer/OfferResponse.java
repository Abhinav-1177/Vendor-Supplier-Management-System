package com.supplybridge.vsmsBackend.offer;

import java.math.BigDecimal;
import java.time.Instant;

public record OfferResponse(
        Long id,
        Long productId,
        String productName,
        String city,
        Long supplierId,
        String supplierBusinessName,
        Long vendorId,
        String vendorBusinessName,
        Integer quantity,
        BigDecimal pricePerUnit,
        Integer deliveryDays,
        String note,
        OfferStatus status,
        Instant createdAt
) {
    public static OfferResponse from(Offer o) {
        return new OfferResponse(
                o.getId(), o.getProduct().getId(), o.getProduct().getName(), o.getProduct().getCity(),
                o.getSupplier().getId(), o.getSupplier().getBusinessName(),
                o.getVendor().getId(), o.getVendor().getBusinessName(),
                o.getQuantity(), o.getPricePerUnit(), o.getDeliveryDays(), o.getNote(),
                o.getStatus(), o.getCreatedAt());
    }
}