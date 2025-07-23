package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRequestDto {

    @NotBlank
    @Size(min = 3, max = 30)
    @Pattern(regexp = "^[a-z0-9_-]+$", message = "only a-z, 0-9, _ and -")
    private String username;

    @NotBlank
    @Email
    @JsonProperty("email")
    private String email;

    @JsonProperty("pass_hash")
    private String password;

    @JsonProperty("ava_lonk")
    private String avatarUrl;

    @Past
    @JsonProperty("birthDay")
    private LocalDate birthDate;


}
