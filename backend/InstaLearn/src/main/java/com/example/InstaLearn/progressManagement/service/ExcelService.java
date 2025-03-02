package com.example.InstaLearn.progressManagement.service;

import com.example.InstaLearn.progressManagement.dto.MarksDTO;
import com.example.InstaLearn.progressManagement.dto.MonthlyAverageDTO;
import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.progressManagement.repo.MarksRepo;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExcelService {

    @Autowired
    private MarksRepo marksRepo;

    /**
     * Fetches marks by student ID.
     */
    public List<Marks> getMarksById(String studentId) {
        return marksRepo.findByStudentId(studentId);
    }

    /**
     * Imports data from an uploaded Excel file (from frontend).
     */
    public void importExcel(MultipartFile file) throws Exception {
        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = WorkbookFactory.create(inputStream)) {
            importDataFromWorkbook(workbook);
        }
    }

    /**
     * Imports data from an existing Excel file stored on disk.
     */
    public void importExcel(File file) throws Exception {
        try (FileInputStream fis = new FileInputStream(file);
             Workbook workbook = WorkbookFactory.create(fis)) {
            importDataFromWorkbook(workbook);
        }
    }

    /**
     * Reads the Excel file and stores data in the database.
     */
    private void importDataFromWorkbook(Workbook workbook) {
        Sheet sheet = workbook.getSheetAt(0);
        List<Marks> marksList = new ArrayList<>();

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // Skip header row

            Marks marks = new Marks();
            marks.setMarks(row.getCell(0).getNumericCellValue());
            marks.setMonth(row.getCell(1).getStringCellValue());
            marks.setStudentId(row.getCell(2).getStringCellValue());

            marksList.add(marks);
        }

        marksRepo.saveAll(marksList);
    }

    /**
     * Retrieves paginated marks data.
     */
    public Page<Marks> getPaginatedMarks(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));  // This sorts by the given field (e.g., student ID)
        return marksRepo.findAll(pageable);
    }


    public List<MarksDTO> getAllMarks() {
        return marksRepo.findAll()
                .stream()
                .map(m->new MarksDTO(m.getStudentId(),m.getMarks(),m.getMonth()))
                .collect(Collectors.toList());
    }


    public Double calculateAverageMarksForAll(String month) {
        List<Marks> marksList = marksRepo.findByMonth(month);

        if (marksList.isEmpty()) {
            return null;
        }

        double total = marksList.stream().mapToDouble(Marks::getMarks).sum();
        return total / marksList.size();
    }

    public List<MonthlyAverageDTO> getMonthlyAverageMarks() {
        List<Object[]> results = marksRepo.calculateMonthlyAverageMarks();
        return results.stream()
                .map(row -> new MonthlyAverageDTO((String) row[0], (Double) row[1]))
                .collect(Collectors.toList());
    }
}
