package com.supplybridge.vsmsBackend.product;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

// Same rules as the Add Product form, so the API never trusts the browser alone.
public record ProductRequest(
        @NotBlank(message = "Enter a product name.") String name,
        @NotNull(message = "Enter a price above 0.")
        @DecimalMin(value = "0.01", message = "Enter a price above 0.") BigDecimal price,
        @NotNull(message = "Enter a whole number of units.")
        @Min(value = 0, message = "Enter a whole number of units.") Integer stock,
        @NotNull(message = "Select a category.") Category category,
        @NotBlank(message = "Select a city.") String city,
        String description
) {
}