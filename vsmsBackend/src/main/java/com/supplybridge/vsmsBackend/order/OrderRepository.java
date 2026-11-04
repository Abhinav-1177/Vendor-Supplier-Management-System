package com.supplybridge.vsmsBackend.order;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findBySupplierIdOrderByCreatedAtDesc(Long supplierId);
    List<Order> findByVendorIdOrderByCreatedAtDesc(Long vendorId);
}