package com.myapp.taskmanager.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity // this class represents tasks table inside the database
@Table(name = "tasks")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@NoArgsConstructor // empty constructor
@AllArgsConstructor // all arguments constructor
public class Task {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Boolean completed = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "deleted_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

}
