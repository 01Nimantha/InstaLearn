package com.example.InstaLearn.attendanceManagement.controller;

import com.example.InstaLearn.attendanceManagement.dto.AttendanceDTO;
import com.example.InstaLearn.attendanceManagement.service.AttendanceService;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;

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
    @GetMapping("/total-students")
    public ResponseEntity<Long> getTotalAttendance() {
        long totalStudents = attendanceService.getTotalAttendance();
        return ResponseEntity.ok(totalStudents);
    }

    @GetMapping("/count")
    public int getPresentCount(@RequestParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        return attendanceService.getPresentCountByDate(localDate);
    }

}
