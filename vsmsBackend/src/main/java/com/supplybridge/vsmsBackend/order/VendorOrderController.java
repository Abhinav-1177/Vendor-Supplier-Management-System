package com.supplybridge.vsmsBackend.order;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/vendor/orders")
public class VendorOrderController {

    private final OrderService service;

    public VendorOrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<OrderResponse> list(@AuthenticationPrincipal Jwt jwt) {
        return service.byVendor(Long.valueOf(jwt.getSubject()));
    }
}