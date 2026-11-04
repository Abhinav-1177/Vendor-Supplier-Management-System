package com.supplybridge.vsmsBackend.admin;

import java.time.Instant;

import com.supplybridge.vsmsBackend.user.Role;
import com.supplybridge.vsmsBackend.user.User;
import com.supplybridge.vsmsBackend.user.UserStatus;

public record AdminUserResponse(
        Long id,
        String name,
        String email,
        Role role,
        String businessName,
        String city,
        String phone,
        String gstin,
        UserStatus status,
        String rejectionReason,
        Instant joinedAt
) {
    public static AdminUserResponse from(User u) {
        return new AdminUserResponse(
                u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getBusinessName(),
                u.getCity(), u.getPhone(), u.getGstin(), u.getStatus(), u.getRejectionReason(),
                u.getCreatedAt());
    }
}