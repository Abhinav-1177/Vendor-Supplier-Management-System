package com.supplybridge.vsmsBackend.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Enter your email and password.") String email,
        @NotBlank(message = "Enter your email and password.") String password
) {
}