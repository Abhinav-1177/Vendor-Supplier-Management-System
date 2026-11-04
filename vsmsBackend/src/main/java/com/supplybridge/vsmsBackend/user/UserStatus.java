package com.supplybridge.vsmsBackend.user;

public enum UserStatus {
    PENDING,   // signed up, waiting for admin review
    ACTIVE,    // approved
    BLOCKED,   // blocked by admin after approval
    REJECTED   // admin rejected the signup (see rejectionReason)
}