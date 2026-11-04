package com.supplybridge.vsmsBackend.product;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor/products")
public class VendorProductController {

    private final ProductService service;

    public VendorProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductResponse> browse(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Category category) {
        return service.browse(city, category);
    }
}