package com.example.InstaLearn.scheduleManagement2.impl;

import com.example.InstaLearn.scheduleManagement2.Event;
import com.example.InstaLearn.scheduleManagement2.ScheduleManagementRepository;
import com.example.InstaLearn.scheduleManagement2.ScheduleManagementService;
import com.example.InstaLearn.scheduleManagement2.dto.EventDTO;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class scheduleManagementImpl implements ScheduleManagementService {
    ScheduleManagementRepository scheduleManagementRepository;
    public scheduleManagementImpl(ScheduleManagementRepository scheduleManagementRepository){
        this.scheduleManagementRepository=scheduleManagementRepository;
    }

    @Override
    public List<Event> getAllEvent() {
        try{
            return scheduleManagementRepository.findAll();
        } catch (Exception e){
            return null;
        }

    }

    @Override
    public Event GetEventById(int id) {
        try{
            return scheduleManagementRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public String SaveEvent(EventDTO event) {
        try{
            Event data = new Event();
            data.setTitle(event.getTitle());
            data.setDate(event.getDate());
            data.setTime(event.getTime());
            scheduleManagementRepository.save(data);
            return "Save Event";
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public String EditEvent(int id, EventDTO event) {
        try {
            Event data = scheduleManagementRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
            data.setTitle(event.getTitle());
            data.setDate(event.getDate());
            data.setTime(event.getTime());
            scheduleManagementRepository.save(data);
            return "Edit Event";
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public String DeleteEvent(int id) {
        try{
            scheduleManagementRepository.deleteById(id);
            return "Delete Event";
        }catch (Exception e){
            return null;
        }
    }


}
