package com.example.InstaLearn.progressManagement.service;

import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.progressManagement.repo.MarksRepo;
import com.example.InstaLearn.userManagement.entity.Student;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    @Autowired
    private MarksRepo marksRepo;

    public Marks getMarksById(String studentId) {
        return marksRepo.findByStudentIdEquals(studentId);
    }

    public void importExcel(MultipartFile file) throws Exception {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = WorkbookFactory.create(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        Student student = new Student();

        List<Marks> markss = new ArrayList<>();
        for (Row row : sheet) {
            if (row.getRowNum() == 0) { // Skip header
                continue;
            }

            Marks marks = new Marks();
            marks.setMarks(row.getCell(0).getNumericCellValue());
            marks.setMonth(row.getCell(1).getLocalDateTimeCellValue().toLocalDate());
            marks.setStudentId(row.getCell(2).getStringCellValue());

            markss.add(marks);
        }

        marksRepo.saveAll(markss);
        workbook.close();
    }

    public Page<Marks> getPaginatedMarks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return marksRepo.findAll(pageable);
    }
}
