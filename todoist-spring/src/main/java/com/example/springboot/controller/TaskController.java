package com.example.springboot.controller;

import com.example.springboot.dto.TaskServiceDTO;
import com.example.springboot.model.Task;
import com.example.springboot.repository.TaskRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    @Autowired
    TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<Task> saveTask(@RequestBody @Valid TaskServiceDTO taskServiceDTO) {
        System.out.println(taskServiceDTO);
        var task = new Task();
        BeanUtils.copyProperties(taskServiceDTO, task);
        return ResponseEntity.status(HttpStatus.CREATED).body(taskRepository.save(task));
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTask(@PathVariable Long id, @RequestBody @Valid TaskServiceDTO taskServiceDTO) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            var taskModel = task.get();
            BeanUtils.copyProperties(taskServiceDTO, taskModel);
            return ResponseEntity.status(HttpStatus.OK).body(taskRepository.save(task.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTask(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()){
            taskRepository.delete(task.get());
            return ResponseEntity.status(HttpStatus.OK).body("Task deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
    }

}
