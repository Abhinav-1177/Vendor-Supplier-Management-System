package com.supplybridge.vsmsBackend.offer;

import com.supplybridge.vsmsBackend.user.User;

public record VendorOption(Long id, String businessName, String city) {
    public static VendorOption from(User u) {
        return new VendorOption(u.getId(), u.getBusinessName(), u.getCity());
    }
}