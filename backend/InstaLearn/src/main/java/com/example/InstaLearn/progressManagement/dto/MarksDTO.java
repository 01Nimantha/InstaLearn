package com.example.InstaLearn.progressManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;


public class MarksDTO {
    private int studentId;
    private int marks;
    private String month; // Change LocalDate to String

    // Constructor to convert LocalDate to Month Name
    public MarksDTO(int studentId, int marks, LocalDate month) {
        this.studentId = studentId;
        this.marks = marks;
        this.month = month.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH); // Converts to "January", "February", etc.
    }

    public MarksDTO(String studentId, double marks, String month) {
    }

    public MarksDTO() {

    }

    // Getters & Setters
    public int getStudentId() { return studentId; }
    public int getMarks() { return marks; }
    public String getMonth() { return month; }

    public void setStudentId(String studentId) {
    }

    public void setJanuary(int markValue) {
    }

    public void setFebruary(int markValue) {
    }

    public void setMarch(int markValue) {
    }

    public void setApril(int markValue) {
    }



}
