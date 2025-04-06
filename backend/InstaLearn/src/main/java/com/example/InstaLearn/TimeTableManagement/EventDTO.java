package com.example.InstaLearn.scheduleManagement2.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EventDTO {
    private String title;
    private String date;
    private String time;
}
