package com.example.InstaLearn.classFeesManagement.controller;

import com.example.InstaLearn.classFeesManagement.ClassFeesSaveRequestDTO;
import com.example.InstaLearn.classFeesManagement.ClassFeesUpdateRequestDTO;
import com.example.InstaLearn.classFeesManagement.enity.ClassFees;
import com.example.InstaLearn.classFeesManagement.service.ClassFeesService;
import com.example.InstaLearn.classTypeManagement.dto.ClassTypeSaveRequestDTO;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("api/v1/classFees"))
@CrossOrigin
public class ClassFeesController {

    @Autowired
    private ClassFeesService classFeesService;

    @PostMapping("/save-class-fees")
    public ResponseEntity<StandardResponse> saveClassFees(@RequestBody ClassFeesSaveRequestDTO classFeesSaveRequestDTO) {
        String message = classFeesService.saveClassFees(classFeesSaveRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<StandardResponse> updateClassFees(@PathVariable(value="id") long classFeesId, @RequestBody ClassFeesUpdateRequestDTO classFeesUpdateRequestDTO) {
        String message = classFeesService.updateClassFees(classFeesId, classFeesUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<StandardResponse> deleteClassFees(@PathVariable(value="id") long classFeesId) {
        String message = classFeesService.deleteClassFees(classFeesId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }
    @GetMapping("/get-all-classes")
    public ResponseEntity<List<ClassFees>> getAllClassFees(){
        return new ResponseEntity<>(classFeesService.getAllClassFees(), HttpStatus.OK);
    }

}
