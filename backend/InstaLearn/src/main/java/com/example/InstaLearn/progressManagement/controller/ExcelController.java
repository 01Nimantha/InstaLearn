package com.example.InstaLearn.progressManagement.controller;

import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.progressManagement.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("api/v1/excel")
@CrossOrigin(origins = "http://localhost:5173")
public class ExcelController {

    private static final String UPLOAD_DIR = "src/main/resources/upload/";

    @Autowired
    private ExcelService excelService;

    /**
     * Uploads an Excel file and automatically imports it into the database.
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded");
        }
        try {
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.write(path, file.getBytes());

            // ✅ Directly process the file after saving
            excelService.importExcel(file);

            return ResponseEntity.ok("File uploaded and imported successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    /**
     * Retrieves marks for a student by ID.
     */
    @GetMapping(path = "/get-by-id", params = "id")
    public ResponseEntity<Marks> getMarksById(@RequestParam(value = "id") String studentId) {
        Marks marks = excelService.getMarksById(studentId);
        return ResponseEntity.ok(marks);
    }

    /**
     * Retrieves paginated marks.
     */
    @GetMapping("/marks")
    public Page<Marks> getMarks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return excelService.getPaginatedMarks(page, size);
    }
}
