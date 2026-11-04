package com.supplybridge.vsmsBackend.offer;

import com.supplybridge.vsmsBackend.common.ApiException;
import com.supplybridge.vsmsBackend.product.Product;
import com.supplybridge.vsmsBackend.product.ProductRepository;
import com.supplybridge.vsmsBackend.user.Role;
import com.supplybridge.vsmsBackend.user.User;
import com.supplybridge.vsmsBackend.user.UserRepository;
import com.supplybridge.vsmsBackend.user.UserStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OfferService {

    private final OfferRepository offers;
    private final ProductRepository products;
    private final UserRepository users;
    private final com.supplybridge.vsmsBackend.order.OrderService orderService;

    public OfferService(OfferRepository offers, ProductRepository products, UserRepository users,
                         com.supplybridge.vsmsBackend.order.OrderService orderService) {
        this.offers = offers;
        this.products = products;
        this.users = users;
        this.orderService = orderService;
    }

    public OfferResponse create(Long supplierId, OfferRequest req) {
        Product product = products.findById(req.productId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Product not found."));

        if (!product.getSupplier().getId().equals(supplierId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You can only send offers for your own products.");
        }

        User vendor = users.findById(req.vendorId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Vendor not found."));
        if (vendor.getRole() != Role.VENDOR || vendor.getStatus() != UserStatus.ACTIVE) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Select an active vendor.");
        }

        Offer offer = new Offer();
        offer.setProduct(product);
        offer.setSupplier(product.getSupplier());
        offer.setVendor(vendor);
        offer.setQuantity(req.quantity());
        offer.setPricePerUnit(req.pricePerUnit());
        offer.setDeliveryDays(req.deliveryDays());
        offer.setNote(req.note());

        return OfferResponse.from(offers.save(offer));
    }

    @Transactional(readOnly = true)
    public List<OfferResponse> sentBySupplier(Long supplierId) {
        return offers.findBySupplierIdOrderByCreatedAtDesc(supplierId).stream()
                .map(OfferResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<OfferResponse> receivedByVendor(Long vendorId) {
        return offers.findByVendorIdOrderByCreatedAtDesc(vendorId).stream()
                .map(OfferResponse::from)
                .toList();
    }

    public OfferResponse updateStatus(Long vendorId, Long offerId, OfferStatusUpdateRequest req) {
        Offer offer = offers.findById(offerId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Offer not found."));

        if (!offer.getVendor().getId().equals(vendorId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You can only respond to your own offers.");
        }
        if (offer.getStatus() != OfferStatus.PENDING) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "This offer has already been responded to.");
        }
        if (req.status() == OfferStatus.PENDING) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "An offer cannot be set back to pending.");
        }

                offer.setStatus(req.status());
        Offer saved = offers.save(offer);

        if (saved.getStatus() == OfferStatus.ACCEPTED) {
            orderService.createFromOffer(saved);
        }

        return OfferResponse.from(saved);

    }
}