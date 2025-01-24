package com.example.InstaLearn.progressManagement.controller;

import com.example.InstaLearn.progressManagement.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}
