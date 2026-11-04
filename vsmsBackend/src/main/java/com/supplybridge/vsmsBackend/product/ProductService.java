package com.supplybridge.vsmsBackend.product;

import com.supplybridge.vsmsBackend.common.ApiException;
import com.supplybridge.vsmsBackend.user.User;
import com.supplybridge.vsmsBackend.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository products;
    private final UserRepository users;

    public ProductService(ProductRepository products, UserRepository users) {
        this.products = products;
        this.users = users;
    }

    public ProductResponse create(Long supplierId, ProductRequest req) {
        User supplier = users.findById(supplierId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Your session has expired. Please log in again."));

        Product product = new Product();
        product.setName(req.name());
        product.setPrice(req.price());
        product.setStock(req.stock());
        product.setCategory(req.category());
        product.setCity(req.city());
        product.setDescription(req.description());
        product.setSupplier(supplier);

        return ProductResponse.from(products.save(product));
    }

    public List<ProductResponse> myProducts(Long supplierId) {
        return products.findBySupplierId(supplierId).stream()
                .map(ProductResponse::from)
                .toList();
    }
        @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<ProductResponse> browse(String city, Category category) {
        return products.findAll().stream()
                .filter(p -> city == null || city.isBlank() || p.getCity().equalsIgnoreCase(city))
                .filter(p -> category == null || p.getCategory() == category)
                .map(ProductResponse::from)
                .toList();
    }
        public ProductResponse update(Long supplierId, Long productId, ProductRequest req) {
        Product product = products.findById(productId)
                .orElseThrow(() -> new com.supplybridge.vsmsBackend.common.ApiException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Product not found."));

        if (!product.getSupplier().getId().equals(supplierId)) {
            throw new com.supplybridge.vsmsBackend.common.ApiException(
                    org.springframework.http.HttpStatus.FORBIDDEN, "You can only edit your own products.");
        }

        product.setName(req.name());
        product.setPrice(req.price());
        product.setStock(req.stock());
        product.setCategory(req.category());
        product.setCity(req.city());
        product.setDescription(req.description());

        return ProductResponse.from(products.save(product));
    }

    public void delete(Long supplierId, Long productId) {
        Product product = products.findById(productId)
                .orElseThrow(() -> new com.supplybridge.vsmsBackend.common.ApiException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Product not found."));

        if (!product.getSupplier().getId().equals(supplierId)) {
            throw new com.supplybridge.vsmsBackend.common.ApiException(
                    org.springframework.http.HttpStatus.FORBIDDEN, "You can only delete your own products.");
        }

        products.delete(product);
    }
}