package com.supplybridge.vsmsBackend.user;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    CommandLineRunner seedAdmin(
            UserRepository users,
            PasswordEncoder encoder,
            @Value("${app.admin.email}") String adminEmail,
            @Value("${app.admin.password}") String adminPassword) {
        return args -> {
            if (users.existsByEmailIgnoreCase(adminEmail)) return;
            if (adminPassword.isBlank()) {
                throw new IllegalStateException("Set ADMIN_PASSWORD before creating the initial admin account.");
            }

            User admin = new User();
            admin.setName("Platform Admin");
            admin.setBusinessName("SupplyBridge");
            admin.setEmail(adminEmail);
            admin.setPhone("9000000000");
            admin.setCity("Delhi");
            admin.setPasswordHash(encoder.encode(adminPassword));

            admin.setRole(Role.ADMIN);
            admin.setStatus(UserStatus.ACTIVE);
            users.save(admin);
            System.out.println("Seeded admin account: " + adminEmail);
        };
    }
}