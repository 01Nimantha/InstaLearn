package com.example.InstaLearn.scheduleManagement2;

import com.example.InstaLearn.scheduleManagement2.dto.EventDTO;

import java.util.List;

public interface ScheduleManagementService {
    List<Event> getAllEvent();

    Event GetEventById(int id);

    String SaveEvent(EventDTO event);

    String EditEvent(int id, EventDTO event);

    String DeleteEvent(int id);
}
