package com.myapp.taskmanager.service;

import com.myapp.taskmanager.model.Task;
import com.myapp.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    public Task createTask(Task task){
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }
    public List<Task> getAllTask(){
        return taskRepository.findAll();
    }
    public Optional<Task> getTaskById(Long id){
        return taskRepository.findById(id);
    }
    public Task updateTask(Long id, Task taskDetails){
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        task.setTitle(taskDetails.getTitle());
    }
}
