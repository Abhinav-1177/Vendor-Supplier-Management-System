package com.supplybridge.vsmsBackend.offer;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findBySupplierIdOrderByCreatedAtDesc(Long supplierId);
    List<Offer> findByVendorIdOrderByCreatedAtDesc(Long vendorId);
}