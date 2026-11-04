package com.supplybridge.vsmsBackend.admin;

import com.supplybridge.vsmsBackend.user.UserStatus;

import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequest(
        @NotNull(message = "Status is required.") UserStatus status,
        String reason
) {

    // public UserStatus status() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'status'");
    // }
}