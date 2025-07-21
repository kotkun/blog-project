package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        // Все пути, кроме `/api/**`, перенаправляются на `index.html`
        registry.addViewController("/{path:[^\\.]*}")
                .setViewName("forward:/index.html");
    }
}