package com.example.litlens_backend.service;

import com.example.litlens_backend.model.BookReview;
import com.example.litlens_backend.repository.BookReviewRepository;
import com.example.litlens_backend.exceptions.BookReviewNotFoundException;
import com.example.litlens_backend.exceptions.InvalidBookReviewException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookReviewService {

    private final BookReviewRepository bookReviewRepository;

    @Autowired
    public BookReviewService(BookReviewRepository bookReviewRepository) {
        this.bookReviewRepository = bookReviewRepository;
    }

    public BookReview saveBookReview(BookReview bookReview) {
        if (bookReview.getBookTitle() == null || bookReview.getAuthor() == null) {
            throw new InvalidBookReviewException("Book title and author are required");
        }
        return bookReviewRepository.save(bookReview);
    }

    public List<BookReview> getAllBookReviews() {
        return bookReviewRepository.findAll();
    }

    public BookReview getBookReviewById(Long id) {
        Optional<BookReview> review = bookReviewRepository.findById(id);
        return review.orElseThrow(() -> new BookReviewNotFoundException("Review with ID " + id + " not found"));
    }

    public BookReview updateBookReview(Long id, BookReview updatedReview) {
        BookReview existingReview = getBookReviewById(id);
        existingReview.setBookTitle(updatedReview.getBookTitle());
        existingReview.setAuthor(updatedReview.getAuthor());
        existingReview.setRating(updatedReview.getRating());
        existingReview.setReviewText(updatedReview.getReviewText());
        return bookReviewRepository.save(existingReview);
    }

    public void deleteBookReview(Long id) {
        BookReview existingReview = getBookReviewById(id);
        bookReviewRepository.delete(existingReview);
    }
}
