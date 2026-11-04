package com.supplybridge.vsmsBackend.common;

import org.springframework.http.HttpStatus;

// Throw this anywhere; GlobalExceptionHandler turns it into {"message": "..."} with the status.
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}