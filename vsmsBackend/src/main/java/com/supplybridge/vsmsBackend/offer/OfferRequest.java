package com.supplybridge.vsmsBackend.offer;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record OfferRequest(
        @NotNull(message = "Select a product.") Long productId,
        @NotNull(message = "Select a vendor.") Long vendorId,
        @NotNull(message = "Enter a whole quantity above 0.")
        @Min(value = 1, message = "Enter a whole quantity above 0.") Integer quantity,
        @NotNull(message = "Enter a price above 0.")
        @DecimalMin(value = "0.01", message = "Enter a price above 0.") BigDecimal pricePerUnit,
        @NotNull(message = "Enter 1 to 30 days.")
        @Min(value = 1, message = "Enter 1 to 30 days.")
        @Max(value = 30, message = "Enter 1 to 30 days.") Integer deliveryDays,
        String note
) {
}