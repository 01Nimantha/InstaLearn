package com.example.InstaLearn.scheduleManagement.service;

import com.example.InstaLearn.scheduleManagement.dto.EventDTO;

public interface EventService {

    void saveEvent(EventDTO eventDTO);

    String updateEvent(EventDTO eventDTO);

    String deleteEvent(int eventId);
}
