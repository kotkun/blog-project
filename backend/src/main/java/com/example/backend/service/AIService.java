package com.example.backend.service;

import com.example.backend.exeption.DeepSeekException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@Service
public class AIService {

        private final RestTemplate deepSeekRestTemplate;
        private final HttpHeaders deepSeekHeaders;
        private final String apiUrl = "https://api.deepseek.com/v1/chat/completions";

        public String generatePostTitle(String content) {
            String prompt = """
            Сгенерируй краткий, цепляющий заголовок для поста в блоге на основе следующего текста.
            Требования:
            - Длина: 5-7 слов
            - Без кавычек
            - Язык: русский
            - Стиль: профессиональный
            
            Текст: %s
            """.formatted(content.substring(0, Math.min(content.length(), 1000)));

            Map<String, Object> requestBody = Map.of(
                    "model", "deepseek-chat",
                    "messages", List.of(Map.of(
                            "role", "user",
                            "content", prompt
                    )),
                    "temperature", 0.7,
                    "max_tokens", 50
            );

            try {
                HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, deepSeekHeaders);
                ResponseEntity<Map> response = deepSeekRestTemplate.postForEntity(
                        apiUrl,
                        request,
                        Map.class
                );

                return extractTitleFromResponse(response.getBody());
            } catch (Exception e) {
                log.error("DeepSeek API error", e);
                throw new DeepSeekException("Ошибка при генерации заголовка");
            }
        }

        private String extractTitleFromResponse(Map<String, Object> response) {
            try {
                Map<String, Object> firstChoice = (Map<String, Object>)((List<?>) response.get("choices")).get(0);
                Map<String, String> message = (Map<String, String>)firstChoice.get("message");
                return message.get("content").trim();
            } catch (Exception e) {
                throw new DeepSeekException("Неверный формат ответа DeepSeek");
            }
        }
    }