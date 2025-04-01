package com.example.InstaLearn.progressManagement.dto;

public class MonthlyAverageDTO {
    private String month;
    private double averageMarks;

    public MonthlyAverageDTO(String month, double averageMarks) {
        this.month = month;
        this.averageMarks = averageMarks;
    }

    public String getMonth() {
        return month;
    }

    public double getAverageMarks() {
        return averageMarks;
    }
}