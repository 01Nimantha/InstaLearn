package com.example.InstaLearn.attendanceManagement.exception;

public class AttendanceException extends RuntimeException {
    private final int statusCode;

    public AttendanceException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
} 