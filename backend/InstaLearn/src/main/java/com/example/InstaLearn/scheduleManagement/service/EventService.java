package com.example.InstaLearn.scheduleManagement.service;

import com.example.InstaLearn.scheduleManagement.dto.EventDTO;

import java.util.List;

public interface EventService {

    void saveEvent(EventDTO eventDTO);

    String updateEvent(EventDTO eventDTO);

    String deleteEvent(int eventId);

    List<EventDTO> getAllEvents();
}
