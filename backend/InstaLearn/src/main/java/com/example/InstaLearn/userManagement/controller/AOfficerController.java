package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.AOfficerSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AOfficerUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.service.AOfficerService;
import com.example.InstaLearn.userManagement.service.AdminService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/attendanceOfficer")
@CrossOrigin
public class AOfficerController {
    @Autowired
    private AOfficerService aOfficerService;

    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveAttendanceOfficer(@RequestBody AOfficerSaveRequestDTO aOfficerSaveRequestDTO) {
        String message = aOfficerService.saveAttendanceOfficer(aOfficerSaveRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201, "success", message),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<StandardResponse> updateAttendanceOfficer(@PathVariable(value = "id") String attendanceOfficerId, @RequestBody AOfficerUpdateRequestDTO aOfficerUpdateRequestDTO) {
        String message = aOfficerService.updateAttendanceOfficer(attendanceOfficerId, aOfficerUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "success", message),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<StandardResponse> deleteAttendanceOfficer(@PathVariable(value = "id") String attendanceOfficerId) {
        String message = aOfficerService.deleteAttendanceOfficer(attendanceOfficerId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200, "success", message),
                HttpStatus.OK
        );
    }
//    @GetMapping("/get-all-aOfficers")
//    public ResponseEntity<List<AttendanceOfficer>> getAllAttandanceOfficers(){
//        return new ResponseEntity<>(aOfficerService.getAllAttandanceOfficers(), HttpStatus.FOUND);
//    }

    @GetMapping("/get-all-aOfficers")
    public ResponseEntity<Page<AttendanceOfficer>> getAllAttandanceOfficers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String searchTerm
    ) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("attendanceOfficerId").descending());

        Page<AttendanceOfficer> attendanceOfficers;
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            // Fetch filtered results based on searchTerm
            attendanceOfficers = aOfficerService.searchAttendanceOfficers(searchTerm, pageable);
        } else {
            // Fetch all results if no search term is provided
            attendanceOfficers = aOfficerService.getAllAttandanceOfficers(pageable);
        }

        return new ResponseEntity<>(attendanceOfficers, HttpStatus.OK);
    }


    @GetMapping("/get-aOfficer-by/{id}")
    public AttendanceOfficer getAttendanceOfficerById(@PathVariable(value="id") String attendanceOfficerId) {
        return aOfficerService.getAttendanceOfficerById(attendanceOfficerId);

    }
}
