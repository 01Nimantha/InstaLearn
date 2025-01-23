package com.example.InstaLearn.progressManagement.controller;

import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.progressManagement.service.ExcelService;
import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/excel")
public class ExcelController {
    @Autowired
    private ExcelService excelService;

    @PostMapping("/import")
    public ResponseEntity<String> importExcel(@RequestParam("file") MultipartFile file) {
        try {
            excelService.importExcel(file);
            return ResponseEntity.ok("Excel file imported successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error importing Excel file: " + e.getMessage());
        }
    }

    @GetMapping(
            path="/get-by-id",
            params = "id"

    )
    public ResponseEntity<Marks> getMarksById(@RequestParam(value = "id") String studentId) {
        Marks marks = excelService.getMarksById(studentId);
        return ResponseEntity.ok(marks);
    }
}
