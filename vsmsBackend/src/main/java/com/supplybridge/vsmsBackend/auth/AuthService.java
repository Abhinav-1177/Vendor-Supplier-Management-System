package com.supplybridge.vsmsBackend.auth;

import com.supplybridge.vsmsBackend.common.ApiException;
import com.supplybridge.vsmsBackend.security.JwtService;
import com.supplybridge.vsmsBackend.user.Role;
import com.supplybridge.vsmsBackend.user.User;
import com.supplybridge.vsmsBackend.user.UserRepository;
import com.supplybridge.vsmsBackend.user.UserResponse;
import com.supplybridge.vsmsBackend.user.UserStatus;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class AuthService {

    private static final String BAD_CREDENTIALS = "Incorrect email or password.";

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository users, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.users = users;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public void register(RegisterRequest req) {
        // Admins are created by the system, never through signup
        if (req.role() != Role.VENDOR && req.role() != Role.SUPPLIER) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Choose Vendor or Supplier as the account type.");
        }

        String email = req.email().trim();
        String gstin = req.gstin().trim().toUpperCase(Locale.ROOT);

        if (users.existsByEmailIgnoreCase(email)) {
            throw new ApiException(HttpStatus.CONFLICT, "An account with this email already exists.");
        }
        if (users.existsByGstin(gstin)) {
            throw new ApiException(HttpStatus.CONFLICT, "This GSTIN is already registered.");
        }

        User user = new User();
        user.setName(req.name().trim());
        user.setBusinessName(req.businessName().trim());
        user.setEmail(email);
        user.setPhone(req.phone().trim());
        user.setCity(req.city().trim());
        user.setGstin(gstin);
        user.setPasswordHash(passwordEncoder.encode(req.password()));
        user.setRole(req.role());
        user.setStatus(UserStatus.PENDING); // an admin reviews the GSTIN before the account can log in
        users.save(user);
    }

    public LoginResponse login(LoginRequest req) {
        // Same message for "no such user" and "wrong password" so the API does not reveal which emails exist
        User user = users.findByEmailIgnoreCase(req.email().trim())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, BAD_CREDENTIALS));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, BAD_CREDENTIALS);
        }

        // Password is right, so it is now safe to say why the account cannot log in (403, not 401:
        // a 401 on a normal request means "token expired" and the frontend logs the user out)
        switch (user.getStatus()) {
            case PENDING -> throw new ApiException(HttpStatus.FORBIDDEN,
                    "Your account is waiting for admin approval.");
            case REJECTED -> throw new ApiException(HttpStatus.FORBIDDEN, rejectedMessage(user));
            case BLOCKED -> throw new ApiException(HttpStatus.FORBIDDEN,
                    "This account has been blocked. Contact support.");
            case ACTIVE -> { /* allowed */ }
        }

        return new LoginResponse(jwtService.createToken(user), UserResponse.from(user));
    }

    public UserResponse me(Long userId) {
        User user = users.findById(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Your session has expired. Please log in again."));
        return UserResponse.from(user);
    }

    private static String rejectedMessage(User user) {
        String reason = user.getRejectionReason();
        if (reason == null || reason.isBlank()) {
            return "Your account was rejected.";
        }
        reason = reason.trim();
        return "Your account was rejected: " + reason + (reason.endsWith(".") ? "" : ".");
    }
}