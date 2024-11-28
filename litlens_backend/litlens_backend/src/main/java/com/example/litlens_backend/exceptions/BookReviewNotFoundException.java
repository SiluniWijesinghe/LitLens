package com.example.litlens_backend.exceptions;

public class BookReviewNotFoundException extends RuntimeException {
    public BookReviewNotFoundException(String message) {
        super(message);
    }
}
