package com.example.InstaLearn.progressManagement.controller;

import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.progressManagement.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

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

    @GetMapping("/marks")
    public Page<Marks> getMarks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return excelService.getPaginatedMarks(page, size);
    }

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            return "File uploaded successfully: " + file.getOriginalFilename();
        } catch (IOException e) {
            return "Upload failed: " + e.getMessage();
        }
    }
}
