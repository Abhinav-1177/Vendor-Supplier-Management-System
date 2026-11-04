package com.supplybridge.vsmsBackend.auth;

import com.supplybridge.vsmsBackend.user.UserResponse;

public record LoginResponse(String token, UserResponse user) {
}