package com.supplybridge.vsmsBackend.order;

// import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier/orders")
public class SupplierOrderController {

    private final OrderService service;

    public SupplierOrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<OrderResponse> list(@AuthenticationPrincipal Jwt jwt) {
        return service.bySupplier(Long.valueOf(jwt.getSubject()));
    }

    @PatchMapping("/{id}/deliver")
    public OrderResponse markDelivered(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        return service.markDelivered(Long.valueOf(jwt.getSubject()), id);
    }
}