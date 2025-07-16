package com.example.backend.controllers;

import com.example.backend.exeptions.DeepSeekException;
import com.example.backend.models.Post;
import com.example.backend.repositories.PostRepository;
import com.example.backend.services.AIService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;
    private final AIService deepSeekService;

    public PostController(PostRepository postRepository, AIService deepSeekService) {
        this.postRepository = postRepository;
        this.deepSeekService = deepSeekService;
    }

    //Получить все посты
    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Получить конкретный пост
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable UUID id) {
        System.out.println("Received request for post ID: " + id);
        return postRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Создать пост
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        if (StringUtils.isEmpty(post.getTitle())) {
            try {
                String generatedTitle = deepSeekService.generatePostTitle(
                        StringUtils.defaultIfEmpty(post.getContent(), "")
                );
                post.setTitle(generatedTitle);
            } catch (DeepSeekException e) {
                post.setTitle("Новый пост - " + LocalDate.now());
            }
        }

        Post savedPost = postRepository.save(post);
        return ResponseEntity.created(URI.create("/posts/" + savedPost.getId()))
                .body(savedPost);
    }

    // Обновление поста
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable UUID id, @RequestBody Post post) {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        post.setId(id); // Убедимся, что ID соответствует пути
        Post updatedPost = postRepository.save(post);
        return ResponseEntity.ok(updatedPost);
    }

    // Удаление поста
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}