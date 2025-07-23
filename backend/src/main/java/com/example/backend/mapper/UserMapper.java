package com.example.backend.mapper;

import com.example.backend.dto.UserRequestDto;
import com.example.backend.dto.UserResponseDto;
import com.example.backend.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

public final class UserMapper {

    private static final BCryptPasswordEncoder ENC = new BCryptPasswordEncoder();
    private UserMapper() {}


    public static User toEntity(UserRequestDto dto) {
        User user = new User();
        copyIntoEntity(user, dto, true);
        return user;
    }

    public static void update(User user, UserRequestDto dto) {
        copyIntoEntity(user, dto, true);
        user.setUpdatedDate(LocalDateTime.now());
    }


    public static void patch(User user, UserRequestDto dto) {
        copyIntoEntity(user, dto, false);
        user.setUpdatedDate(LocalDateTime.now());
    }

    public static UserResponseDto toDto(User u) {
        UserResponseDto r = new UserResponseDto();
        r.setUsername(u.getUsername());
        r.setEmail(u.getEmail());
        r.setAvatarUrl(u.getAvatarUrl());
        r.setBirthDate(u.getBirthDate());
        r.setCreatedDate(u.getCreatedDate());
        r.setUpdatedDate(u.getUpdatedDate());
        return r;
    }

    private static void copyIntoEntity(User u, UserRequestDto d, boolean overwriteNull) {

        if (overwriteNull || d.getUsername()   != null) {
            u.setUsername(d.getUsername());
        }
        if (overwriteNull || d.getEmail()      != null) {
            u.setEmail(d.getEmail());
        }
        if (overwriteNull || d.getPassword()   != null) {
            String raw = d.getPassword();
            if (raw != null) u.setPasswordHash(ENC.encode(raw));
            else if (overwriteNull) u.setPasswordHash(null);
        }

        if (overwriteNull || d.getAvatarUrl()  != null) {
            u.setAvatarUrl(d.getAvatarUrl());
        }
        if (overwriteNull || d.getBirthDate()  != null) {
            u.setBirthDate(d.getBirthDate());
        }
    }
}
