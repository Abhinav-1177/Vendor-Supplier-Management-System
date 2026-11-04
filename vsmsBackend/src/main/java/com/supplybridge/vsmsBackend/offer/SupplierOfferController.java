package com.supplybridge.vsmsBackend.offer;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier/offers")
public class SupplierOfferController {

    private final OfferService service;

    public SupplierOfferController(OfferService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<OfferResponse> create(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody OfferRequest req) {
        OfferResponse created = service.create(Long.valueOf(jwt.getSubject()), req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public List<OfferResponse> sent(@AuthenticationPrincipal Jwt jwt) {
        return service.sentBySupplier(Long.valueOf(jwt.getSubject()));
    }
}