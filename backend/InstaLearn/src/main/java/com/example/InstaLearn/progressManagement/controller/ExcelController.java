package com.example.InstaLearn.progressManagement.controller;

import com.example.InstaLearn.progressManagement.dto.MarksDTO;
import com.example.InstaLearn.progressManagement.dto.MonthlyAverageDTO;
import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.progressManagement.repo.MarksRepo;
import com.example.InstaLearn.progressManagement.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/excel")
@CrossOrigin

public class ExcelController {

    private static final String UPLOAD_DIR = "src/main/resources/upload/";

    @Autowired
    private ExcelService excelService;

    @Autowired
    private MarksRepo marksRepo;

    /**
     * Uploads an Excel file and automatically imports it into the database.
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded");
        }
        try {
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.write(path, file.getBytes());

            // Process the file after saving
            excelService.importExcel(file);

            return ResponseEntity.ok("File uploaded and imported successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Retrieves marks for a specific student by ID.
     */
    @GetMapping("/get-by-id")
    public ResponseEntity<?> getMarksById(@RequestParam(value = "id") String studentId) {
        System.out.println("Received request for studentId: " + studentId); // ✅ Debug log
        List<Marks> markList = excelService.getMarksById(studentId);
        return markList != null ? ResponseEntity.ok(markList) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
    }


    /**
     * Retrieves all students' marks with pagination.
     */
    @GetMapping("/marks")
    public Page<Marks> getMarks(
            @RequestParam(required = false) String studentId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Pageable pageable = PageRequest.of(page, size);

        if (studentId != null && !studentId.isEmpty()) {
            return (Page<Marks>) marksRepo.findByStudentId(studentId, pageable);
        }

        return marksRepo.findAll(pageable);
    }


    /**
     * Retrieves the average marks of all students for a specific month.
     */
    @GetMapping("/average-marks/all")
    public ResponseEntity<?> getAverageMarksForAll(@RequestParam("month") String month) {
        Double average = excelService.calculateAverageMarksForAll(month);

        if (average == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"average\": 0}"); // Ensure JSON format
        }

        return ResponseEntity.ok(Collections.singletonMap("average", average));
    }


    /**
     * Retrieves the average marks for each month.
     */
    @GetMapping("/monthly-average-marks")
    public ResponseEntity<List<MonthlyAverageDTO>> getMonthlyAverageMarks() {
        List<MonthlyAverageDTO> monthlyAverages = excelService.getMonthlyAverageMarks();

        if (monthlyAverages.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }

        return ResponseEntity.ok(monthlyAverages);
    }






}