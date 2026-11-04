package com.supplybridge.vsmsBackend.user;

// What the API returns for a user. Never includes the password hash.
public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        String businessName,
        String city,
        String phone,
        String gstin,
        UserStatus status,
        String rejectionReason
) {
    public static UserResponse from(User u) {
        return new UserResponse(
                u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getBusinessName(),
                u.getCity(), u.getPhone(), u.getGstin(), u.getStatus(), u.getRejectionReason());
    }
}