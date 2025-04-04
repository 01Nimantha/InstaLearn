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
    private String day;
    private int startTime;
    private int Duration;
}
