package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.ParentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.service.ParentService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
