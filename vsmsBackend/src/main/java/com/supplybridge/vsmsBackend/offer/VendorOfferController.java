package com.supplybridge.vsmsBackend.offer;

import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor/offers")
public class VendorOfferController {

    private final OfferService service;

    public VendorOfferController(OfferService service) {
        this.service = service;
    }

    @GetMapping
    public List<OfferResponse> received(@AuthenticationPrincipal Jwt jwt) {
        return service.receivedByVendor(Long.valueOf(jwt.getSubject()));
    }

    @PatchMapping("/{id}/status")
    public OfferResponse updateStatus(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id, @Valid @RequestBody OfferStatusUpdateRequest req) {
        return service.updateStatus(Long.valueOf(jwt.getSubject()), id, req);
    }
}