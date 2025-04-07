package com.example.InstaLearn.scheduleManagement.service.impl;
import com.example.InstaLearn.scheduleManagement.dto.EventDTO;
import com.example.InstaLearn.scheduleManagement.entity.Event;
import com.example.InstaLearn.scheduleManagement.repo.EventRepo;
import com.example.InstaLearn.scheduleManagement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceIMPL implements EventService {

    @Autowired
    private EventRepo eventRepo;

    @Override
    public void saveEvent(EventDTO eventDTO) {
        Event event = new Event(
                eventDTO.getEventId(),
                eventDTO.getClassType(),
                eventDTO.getDay(),
                eventDTO.getStartTime(),
                eventDTO.getDuration()
        );
        eventRepo.save(event);
    }

    @Override
    public String updateEvent(EventDTO eventDTO) {
        if(eventRepo.existsById(eventDTO.getEventId())){
            Event event=eventRepo.getReferenceById(eventDTO.getEventId());
            event.setClassType(eventDTO.getClassType());
            event.setDay(eventDTO.getDay());
            event.setStartTime(eventDTO.getStartTime());
            event.setDuration(eventDTO.getDuration());

            eventRepo.save(event);
            return eventDTO.getClassType()+"Updated Successfully";
        }
        else{
            throw new RuntimeException("No data found for that id");
        }
    }

    @Override
    public String deleteEvent(int eventId) {
        if(eventRepo.existsById(eventId)){
            eventRepo.deleteById(eventId);
            return "Deleted Successfully"+ eventId;
        }
        else{
            throw new RuntimeException("No event found for that id");
        }
    }

    @Override
    public List<EventDTO> getAllEvents() {
        return eventRepo.findAll().stream().map(event -> new EventDTO(
                event.getEventId(),
                event.getClassType(),
                event.getDay(),
                event.getStartTime(),
                event.getDuration()
        )).collect(Collectors.toList());
    }

}
