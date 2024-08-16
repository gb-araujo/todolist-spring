package com.example.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permite CORS para todos os endpoints
                .allowedOrigins("http://127.0.0.1:5500")  // Permite CORS da origem do frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Métodos permitidos
                .allowedHeaders("*")  // Permite todos os cabeçalhos
                .allowCredentials(true);  // Permite envio de credenciais (se necessário)
    }
}
