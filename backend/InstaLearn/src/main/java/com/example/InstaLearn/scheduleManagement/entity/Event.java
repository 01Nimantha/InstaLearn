package com.example.InstaLearn.scheduleManagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private LocalDate date;

    @NotNull
    @Column(columnDefinition = "TIME")
    private LocalTime time;

    @NotNull
    @Enumerated(EnumType.STRING)
    private EventType eventType; //

    private String description;
}
