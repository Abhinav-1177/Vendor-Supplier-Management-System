package com.supplybridge.vsmsBackend.order;

import com.supplybridge.vsmsBackend.common.ApiException;
import com.supplybridge.vsmsBackend.offer.Offer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orders;

    public OrderService(OrderRepository orders) {
        this.orders = orders;
    }

    // Called by OfferService right after a supplier accepts an offer
    public Order createFromOffer(Offer offer) {
        Order order = new Order();
        order.setOffer(offer);
        order.setProduct(offer.getProduct());
        order.setSupplier(offer.getSupplier());
        order.setVendor(offer.getVendor());
        order.setQuantity(offer.getQuantity());
        order.setPricePerUnit(offer.getPricePerUnit());
        order.setTotalAmount(offer.getPricePerUnit().multiply(BigDecimal.valueOf(offer.getQuantity())));
        return orders.save(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> bySupplier(Long supplierId) {
        return orders.findBySupplierIdOrderByCreatedAtDesc(supplierId).stream()
                .map(OrderResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> byVendor(Long vendorId) {
        return orders.findByVendorIdOrderByCreatedAtDesc(vendorId).stream()
                .map(OrderResponse::from)
                .toList();
    }

    public OrderResponse markDelivered(Long supplierId, Long orderId) {
        Order order = orders.findById(orderId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Order not found."));

        if (!order.getSupplier().getId().equals(supplierId)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "You can only update your own orders.");
        }
        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "This order is already delivered.");
        }

        order.setStatus(OrderStatus.DELIVERED);
        return OrderResponse.from(orders.save(order));
    }
}