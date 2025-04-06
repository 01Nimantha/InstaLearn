package com.example.InstaLearn.scheduleManagement2;

import com.example.InstaLearn.scheduleManagement2.dto.EventDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scheduleManagement")
public class ScheduleManagementController {
    ScheduleManagementService scheduleManagementService;
    public ScheduleManagementController(ScheduleManagementService scheduleManagementService){
        this.scheduleManagementService=scheduleManagementService;
    }

    @GetMapping("/GetAllEvents")
    public ResponseEntity<List<Event>> getAllEvent(){
        List<Event> data = scheduleManagementService.getAllEvent();
        if(data.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }

    @GetMapping("/GetEventById/{id}")
    public ResponseEntity<Event> GetEventById(@PathVariable int id){
        Event data = scheduleManagementService.GetEventById(id);
        if(data == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }

    @PostMapping("/SaveEvent")
    public ResponseEntity<String> SaveEvent(@RequestBody EventDTO event){
        String data = scheduleManagementService.SaveEvent(event);
        if(data.isEmpty()){
            return new ResponseEntity<>("Coudn't Save Event",HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(data,HttpStatus.CREATED);
        }
    }

    @PutMapping("/EditEvent/{id}")
    public ResponseEntity<String> EditEvent(@PathVariable int id,@RequestBody EventDTO event){
        String data = scheduleManagementService.EditEvent(id,event);
        if(data.isEmpty()){
            return new ResponseEntity<>("Coudn't Edit Event",HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }

    @DeleteMapping("/DeleteEvent/{id}")
    public ResponseEntity<String> DeleteEvent(@PathVariable int id){
        String data =scheduleManagementService.DeleteEvent(id);
        if(data.isEmpty()){
            return new ResponseEntity<>("Coudn't Delete Event",HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }

}
