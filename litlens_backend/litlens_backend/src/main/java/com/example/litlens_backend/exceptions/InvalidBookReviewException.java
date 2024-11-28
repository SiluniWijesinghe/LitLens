package com.example.litlens_backend.exceptions;

public class InvalidBookReviewException extends RuntimeException {
    public InvalidBookReviewException(String message) {
        super(message);
    }
}
