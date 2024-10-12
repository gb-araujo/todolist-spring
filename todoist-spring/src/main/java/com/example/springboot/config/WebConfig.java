package com.example.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // permite CORS para todos os endpoints
                .allowedOrigins("http://192.168.15.159:5173") // adicione o IP do frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // permite métodos específicos
                .allowedHeaders("*"); // permite todos os cabeçalhos
    }
}
