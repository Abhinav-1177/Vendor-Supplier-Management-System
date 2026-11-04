package com.supplybridge.vsmsBackend.offer;

import jakarta.validation.constraints.NotNull;

public record OfferStatusUpdateRequest(
        @NotNull(message = "Status is required.") OfferStatus status
) {
}