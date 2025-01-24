package com.example.InstaLearn.attendanceManagement.controller;

import com.example.InstaLearn.attendanceManagement.dto.AttendanceDTO;
import com.example.InstaLearn.attendanceManagement.service.AttendanceService;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/attendance")
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveAttendance(@RequestBody AttendanceDTO attendanceDTO) {
        String message = attendanceService.saveAttendance(attendanceDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message),
                HttpStatus.CREATED
        );
    }

}
