package com.supplybridge.vsmsBackend.offer;

import com.supplybridge.vsmsBackend.user.Role;
import com.supplybridge.vsmsBackend.user.UserRepository;
import com.supplybridge.vsmsBackend.user.UserStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/supplier/vendors")
public class SupplierDirectoryController {

    private final UserRepository users;

    public SupplierDirectoryController(UserRepository users) {
        this.users = users;
    }

    @GetMapping
    public List<VendorOption> activeVendors() {
        return users.findByRoleAndStatus(Role.VENDOR, UserStatus.ACTIVE).stream()
                .map(VendorOption::from)
                .toList();
    }
}