package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "posts", schema = "blog")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @JsonProperty(value = "Title", defaultValue = "0000")
    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @JsonProperty(value = "Created")
    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    @JsonProperty(value = "Updated")
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @JsonProperty(value = "Deleted")
    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;
}