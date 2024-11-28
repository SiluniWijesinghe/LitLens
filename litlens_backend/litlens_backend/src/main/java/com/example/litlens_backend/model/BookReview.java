package com.example.litlens_backend.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookTitle;
    private String author;

    @Min(1)
    @Max(5)
    private int rating;

    @Lob
    private String reviewText;

    @Column(updatable = false)
    private LocalDateTime dateAdded = LocalDateTime.now();
}
