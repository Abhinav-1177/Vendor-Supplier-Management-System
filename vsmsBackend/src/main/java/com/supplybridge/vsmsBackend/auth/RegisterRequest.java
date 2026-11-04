package com.supplybridge.vsmsBackend.auth;

import com.supplybridge.vsmsBackend.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

// Same rules as the signup form, so the API never trusts the browser alone.
public record RegisterRequest(
        @NotBlank(message = "Enter your full name.") String name,
        @NotBlank(message = "Enter your business name.") String businessName,
        @NotBlank(message = "Enter a valid email address.")
        @Email(message = "Enter a valid email address.") String email,
        @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a 10-digit mobile number.") String phone,
        @NotBlank(message = "Select your city.") String city,
        @Pattern(regexp = "^\\d{2}[A-Z]{5}\\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$",
                message = "Enter a valid 15-character GSTIN.") String gstin,
        @Size(min = 8, message = "Use at least 8 characters.") String password,
        @NotNull(message = "Select an account type.") Role role
) {
}