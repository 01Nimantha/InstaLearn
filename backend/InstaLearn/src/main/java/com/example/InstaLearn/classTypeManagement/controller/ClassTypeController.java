package com.example.InstaLearn.classTypeManagement.controller;

import com.example.InstaLearn.classTypeManagement.dto.ClassTypeSaveRequestDTO;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.entity.enums.Type;
import com.example.InstaLearn.classTypeManagement.service.ClassTypeService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/classType"))
@CrossOrigin
public class ClassTypeController {

    @Autowired
    private ClassTypeService classTypeService;

    @PostMapping("/save-class-type")
    public ResponseEntity<StandardResponse> saveClassType(@RequestBody ClassTypeSaveRequestDTO classTypeSaveRequestDTO) {
        String message = classTypeService.saveClassType(classTypeSaveRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message),
                HttpStatus.CREATED
        );
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<StandardResponse> updateClassType(@PathVariable(value="id") long classTypeId,@RequestBody ClassTypeSaveRequestDTO classTypeSaveRequestDTO) {
        String message = classTypeService.updateClassType(classTypeId,classTypeSaveRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<StandardResponse> deleteClassType(@PathVariable(value="id") long classTypeId) {
        String message = classTypeService.deleteClassType(classTypeId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }
    @GetMapping("/get-all-classes")
    public ResponseEntity<List<ClassType>> getAllClasses(){
        return new ResponseEntity<>(classTypeService.getAllClasses(), HttpStatus.OK);
    }

    @GetMapping("/get-all-class-names")
    public ResponseEntity<List<String>> getAllClassNames(){
        return new ResponseEntity<>(classTypeService.getAllClassNames(), HttpStatus.OK);
    }

    @GetMapping("/get-all-class-types")
    public ResponseEntity<List<String>> getAllClassTypes(){
        return new ResponseEntity<>(classTypeService.getAllClassTypes(), HttpStatus.OK);
    }

    @GetMapping("get-class-type-id")
    public ResponseEntity<Long> getClassTypeId(
            @RequestParam String className,
            @RequestParam Type type) {
        Long classTypeId = classTypeService.getClassTypeId(className, type);
        return ResponseEntity.ok(classTypeId);
    }

    @GetMapping("/get-name-and-type/{id}")
    public ResponseEntity<String> getClassTypeNameAndTypeById(@PathVariable("id") long classTypeId) {
        String result = classTypeService.getClassTypeNameAndTypeById(classTypeId);
        return ResponseEntity.ok(result);
    }


}
