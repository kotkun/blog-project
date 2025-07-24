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

    public static UserResponseDto toDto(User user) {
        UserResponseDto r = new UserResponseDto();
        r.setUsername(user.getUsername());
        r.setEmail(user.getEmail());
        r.setAvatarUrl(user.getAvatarUrl());
        r.setBirthDate(user.getBirthDate());
        r.setCreatedDate(user.getCreatedDate());
        r.setUpdatedDate(user.getUpdatedDate());
        return r;
    }

    private static void copyIntoEntity(User user, UserRequestDto dto, boolean overwriteNull) {

        if (overwriteNull || dto.getUsername()   != null) {
            user.setUsername(dto.getUsername());
        }
        if (overwriteNull || dto.getEmail()      != null) {
            user.setEmail(dto.getEmail());
        }
        if (overwriteNull || dto.getPassword()   != null) {
            String raw = dto.getPassword();
            if (raw != null) user.setPassword(ENC.encode(raw));
            else if (overwriteNull) user.setPassword(null);
        }

        if (overwriteNull || dto.getAvatarUrl()  != null) {
            user.setAvatarUrl(dto.getAvatarUrl());
        }
        if (overwriteNull || dto.getBirthDate()  != null) {
            user.setBirthDate(dto.getBirthDate());
        }
    }
}
