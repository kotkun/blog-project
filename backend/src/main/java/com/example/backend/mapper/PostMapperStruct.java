package com.example.backend.mapper;

import com.example.backend.model.Post;
import com.example.backend.repository.PostRepository;

//@Mapper
public interface PostMapperStruct {
    PostRepository getPostRepository(Post post);
}
