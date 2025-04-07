package com.example.InstaLearn.scheduleManagement.controller;

import com.example.InstaLearn.scheduleManagement.dto.EventDTO;
import com.example.InstaLearn.scheduleManagement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/event")
@CrossOrigin

public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping("/save")
    public String saveEvent(@RequestBody EventDTO eventDTO) {
        eventService.saveEvent(eventDTO);
        return "saved";

    }

    @PutMapping("/update")
    public String updateEvent(@RequestBody EventDTO eventDTO) {
        String  msg=eventService.updateEvent(eventDTO);
        return msg;
    }

    @DeleteMapping(
            path = "delete-event",
            params = "id"
    )
    public String deleteEvent(@RequestParam(value = "id") int eventId) {
        String deleted=eventService.deleteEvent(eventId);
        return deleted;
    }

    @GetMapping("/all")
    public List<EventDTO> getAllEvents() {

        return eventService.getAllEvents();
    }
}
