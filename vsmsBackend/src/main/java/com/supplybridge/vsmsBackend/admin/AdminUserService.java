package com.supplybridge.vsmsBackend.admin;

import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.supplybridge.vsmsBackend.common.ApiException;
import com.supplybridge.vsmsBackend.user.Role;
import com.supplybridge.vsmsBackend.user.User;
import com.supplybridge.vsmsBackend.user.UserRepository;
import com.supplybridge.vsmsBackend.user.UserStatus;

@Service
public class AdminUserService {

    private final UserRepository users;

    public AdminUserService(UserRepository users) {
        this.users = users;
    }

    @Transactional(readOnly = true)
    public List<AdminUserResponse> list(Role role, UserStatus status, String q) {
        String needle = q == null ? "" : q.trim().toLowerCase();
        return users.findAll().stream()
                .filter(u -> role == null || u.getRole() == role)
                .filter(u -> status == null || u.getStatus() == status)
                .filter(u -> needle.isEmpty()
                        || u.getName().toLowerCase().contains(needle)
                        || u.getEmail().toLowerCase().contains(needle))
                .sorted(Comparator.comparing(User::getCreatedAt).reversed())
                .map(AdminUserResponse::from)
                .toList();
    }

    @Transactional
    public AdminUserResponse updateStatus(Long id, StatusUpdateRequest req) {
        User user = users.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found."));

        if (user.getRole() == Role.ADMIN) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Admin accounts cannot be changed.");
        }
        if (req.status() == UserStatus.PENDING) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "An account cannot be moved back to pending.");
        }

        if (req.status() == UserStatus.REJECTED) {
            String reason = req.reason() == null ? "" : req.reason().trim();
            if (reason.isEmpty()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "A reason is required when rejecting an account.");
            }
            user.setRejectionReason(reason);
        } else {
            user.setRejectionReason(null);
        }

        user.setStatus(req.status());
        return AdminUserResponse.from(users.save(user));
    }
}