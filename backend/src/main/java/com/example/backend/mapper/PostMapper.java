package com.example.backend.mapper;

import com.example.backend.dto.PostRequest;
import com.example.backend.dto.PostResponse;
import com.example.backend.model.Post;
import org.springframework.stereotype.Service;

@Service
public class PostMapper {

    public PostResponse toResponse(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        response.setContent(post.getContent());
        response.setCreatedDate(post.getCreatedDate());
        return response;
    }

    public Post toEntity(PostRequest request) {
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        return post;
    }
}
