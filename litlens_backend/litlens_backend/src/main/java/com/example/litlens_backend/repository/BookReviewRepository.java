package com.example.litlens_backend.repository;

import com.example.litlens_backend.model.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookReviewRepository extends JpaRepository<BookReview, Long> {
}

