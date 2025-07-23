package com.example.backend.controller;


import com.example.backend.dto.UserRequestDto;
import com.example.backend.dto.UserResponseDto;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repo;

    @PostMapping
    public ResponseEntity<UserResponseDto> create(@Valid @RequestBody UserRequestDto dto) {
        if (repo.existsByEmail(dto.getEmail()))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        User saved = repo.save(UserMapper.toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(UserMapper.toDto(saved));
    }


    @PostMapping("/auth/signup")
    public ResponseEntity<UserResponseDto> signup(@Valid @RequestBody UserRequestDto dto) {
        if (repo.existsByEmail(dto.getEmail()) || repo.existsByUsername(dto.getUsername()))
            return ResponseEntity.status(HttpStatus.CONFLICT).build();

        User saved = repo.save(UserMapper.toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(UserMapper.toDto(saved));
    }


    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAll() {
        List<UserResponseDto> list = repo.findAll()
                .stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getById(@PathVariable UUID id) {
        return repo.findById(id)
                .map(u -> ResponseEntity.ok(UserMapper.toDto(u)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> update(@PathVariable UUID id,
                                                  @Valid @RequestBody UserRequestDto dto) {
        return repo.findById(id)
                .map(u -> {
                    UserMapper.update(u, dto);
                    return ResponseEntity.ok(UserMapper.toDto(repo.save(u)));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PatchMapping("/me")
    public ResponseEntity<UserResponseDto> patchMe(@AuthenticationPrincipal UserDetails ud,
                                                   @RequestBody UserRequestDto dto) {
        User u = repo.findByUsername(ud.getUsername()).orElseThrow();
        UserMapper.patch(u, dto);
        return ResponseEntity.ok(UserMapper.toDto(repo.save(u)));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
