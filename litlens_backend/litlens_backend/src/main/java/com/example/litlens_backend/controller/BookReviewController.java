package com.example.litlens_backend.controller;

import com.example.litlens_backend.model.BookReview;
import com.example.litlens_backend.service.BookReviewService;
import com.example.litlens_backend.exceptions.BookReviewNotFoundException;
import com.example.litlens_backend.exceptions.InvalidBookReviewException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class BookReviewController {

    private final BookReviewService bookReviewService;

    @Autowired
    public BookReviewController(BookReviewService bookReviewService) {
        this.bookReviewService = bookReviewService;
    }

    @PostMapping
    public ResponseEntity<BookReview> createBookReview(@RequestBody BookReview bookReview) {
        try {
            BookReview savedReview = bookReviewService.saveBookReview(bookReview);
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } catch (InvalidBookReviewException ex) {
            return ResponseEntity.badRequest().body(null); // Bad Request (400) for invalid input
        }
    }

    @GetMapping
    public ResponseEntity<List<BookReview>> getAllBookReviews() {
        List<BookReview> reviews = bookReviewService.getAllBookReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookReview> getBookReviewById(@PathVariable Long id) {
        try {
            BookReview bookReview = bookReviewService.getBookReviewById(id);
            return ResponseEntity.ok(bookReview);
        } catch (BookReviewNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 if not found
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookReview> updateBookReview(@PathVariable Long id, @RequestBody BookReview updatedReview) {
        try {
            BookReview updated = bookReviewService.updateBookReview(id, updatedReview);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (BookReviewNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 if review not found
        } catch (InvalidBookReviewException ex) {
            return ResponseEntity.badRequest().body(null); // 400 for invalid data
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBookReview(@PathVariable Long id) {
        try {
            bookReviewService.deleteBookReview(id);
            return ResponseEntity.ok("Review deleted successfully");
        } catch (BookReviewNotFoundException ex) {
            return ResponseEntity.notFound().build(); // 404 if review not found
        }
    }
}
