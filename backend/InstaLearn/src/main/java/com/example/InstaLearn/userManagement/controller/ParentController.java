package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.ParentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.service.ParentService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/parent")
@CrossOrigin
public class ParentController {

    @Autowired
    private ParentService parentService;

    @PutMapping("/update/{id}")
    public ResponseEntity<StandardResponse> updateParent(@PathVariable(value="id") String parentId, @RequestBody ParentUpdateRequestDTO parentUpdateRequestDTO) {
        String message = parentService.updateParent(parentId,parentUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }

    @GetMapping("/get-all-parents")
    public ResponseEntity<Page<Parent>> getAllParents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String searchTerm
    ){

        Pageable pageable = PageRequest.of(page, size, Sort.by("parentId").descending());

        Page<Parent> parents;
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            // Fetch filtered results based on searchTerm
            parents = parentService.searchParents(searchTerm, pageable);
        } else {
            // Fetch all results if no search term is provided
            parents = parentService.getAllParents(pageable);
        }

        return new ResponseEntity<>(parents, HttpStatus.OK);
    }

    @GetMapping("/get-parent-by/{id}")
    public Parent getParentById(@PathVariable(value="id") String parentId) {
        return parentService.getParentById(parentId);

    }

    @GetMapping("/get-student-by-parent/{id}")
    public String getStudentByParentId(@PathVariable(value="id") String parentId) {
        return parentService.getStudentByParentId(parentId);

    }
}
