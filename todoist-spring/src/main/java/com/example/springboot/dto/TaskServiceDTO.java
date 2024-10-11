package com.example.springboot.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data

public class TaskServiceDTO {

    public TaskServiceDTO() {
    }
    private String title;
    private String description;
    private boolean completed;

    // Getters and Setters
}
