package com.example.InstaLearn.scheduleManagement.dto;
import lombok.*;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EventDTO {

    private int eventId;
    private String classType;
    private String Day;
    private int startTime;
    private int Duration;
}
