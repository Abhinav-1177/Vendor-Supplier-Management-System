package com.supplybridge.vsmsBackend.product;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody ProductRequest req) {
        ProductResponse created = service.create(Long.valueOf(jwt.getSubject()), req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public List<ProductResponse> myProducts(@AuthenticationPrincipal Jwt jwt) {
        return service.myProducts(Long.valueOf(jwt.getSubject()));
    }
        @PutMapping("/{id}")
    public ProductResponse update(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id, @Valid @RequestBody ProductRequest req) {
        return service.update(Long.valueOf(jwt.getSubject()), id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        service.delete(Long.valueOf(jwt.getSubject()), id);
        return ResponseEntity.noContent().build();
    }
}