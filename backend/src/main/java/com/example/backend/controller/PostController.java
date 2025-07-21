package com.example.backend.controller;

import com.example.backend.dto.PostRequest;
import com.example.backend.dto.PostResponse;
import com.example.backend.model.Post;
import com.example.backend.repository.PostRepository;
import com.example.backend.service.AIService;
import com.example.backend.mapper.PostMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private  PostRepository postRepository;
    @Autowired
    private  AIService deepSeekService;
    @Autowired
    private PostMapper postMapper;

    //Получить все посты
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<PostResponse> responses = postRepository.findAll().stream()
                .map(postMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Получить конкретный пост
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable UUID id) {
        return postRepository.findById(id)
                .map(postMapper::toResponse)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Создать пост
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) {
        Post post = postMapper.toEntity(request);

        if (StringUtils.isEmpty(post.getTitle())) {
            try {
                String generatedTitle = deepSeekService.generatePostTitle(
                        StringUtils.defaultIfEmpty(post.getContent(), "")
                );
                post.setTitle(generatedTitle);
            } catch (Exception e) {
                post.setTitle("Новый пост - " + LocalDate.now());
            }
        }

        Post savedPost = postRepository.save(post);
        return ResponseEntity.created(URI.create("/posts/" + savedPost.getId()))
                .body(postMapper.toResponse(savedPost));
    }

    // Обновление поста
    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable UUID id,
                                                   @RequestBody PostRequest request) {
        return postRepository.findById(id)
                .map(existingPost -> {
                    existingPost.setTitle(request.getTitle());
                    existingPost.setContent(request.getContent());
                    existingPost.setUpdatedDate(LocalDateTime.now());
                    Post updatedPost = postRepository.save(existingPost);
                    return ResponseEntity.ok(postMapper.toResponse(updatedPost));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Мягкое удаление
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setDeletedDate(LocalDateTime.now());
                    postRepository.save(post);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


}