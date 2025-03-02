package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.ParentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.service.ParentService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Parent>> getAllParents(){
        return new ResponseEntity<>(parentService.getAllParents(), HttpStatus.FOUND);
    }

    @GetMapping("/get-parent-by/{id}")
    public Parent getParentById(@PathVariable(value="id") String parentId) {
        return parentService.getParentById(parentId);

    }
}
