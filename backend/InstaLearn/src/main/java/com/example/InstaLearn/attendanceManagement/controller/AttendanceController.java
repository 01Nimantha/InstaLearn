package com.example.InstaLearn.attendanceManagement.controller;

import com.example.InstaLearn.attendanceManagement.dto.*;
import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.attendanceManagement.service.AttendanceService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/get-attendance/{id}")
    public ResponseEntity<List<GetAttendanceDTO>> getAttendanceById(@PathVariable(value="id") String studentId) {
        List<GetAttendanceDTO> attendance = attendanceService.getAttendanceById(studentId);
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("get-students-with-attendance")
    public ResponseEntity<List<StudentAttendanceDTO>> getStudentsWithAttendance() {
        List<StudentAttendanceDTO> studentAttendanceList = attendanceService.getStudentsWithAttendance();

        if (studentAttendanceList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(studentAttendanceList, HttpStatus.OK);
    }

    @GetMapping("get-attendance-by-class-id/{id}")
    public ResponseEntity<List<ClassedBasedAttendanceDTO>> getAttendanceByClassId(@PathVariable(value="id") long classId) {
        List<ClassedBasedAttendanceDTO> attendance = attendanceService.getAttendanceByClassId(classId);
        return ResponseEntity.ok(attendance);
    }

    @PostMapping("save-by-class-id/{id}")
    public ResponseEntity<StandardResponse> saveAttendanceByClassId(@PathVariable(value="id") long classId,@RequestBody AttendanceSaveRequestDTO attendanceDTO) {
        String message = attendanceService.saveAttendanceByClassId(classId,attendanceDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message),
                HttpStatus.CREATED
        );
    }



}
