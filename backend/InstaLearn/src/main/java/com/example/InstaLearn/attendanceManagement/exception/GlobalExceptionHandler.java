package com.example.InstaLearn.attendanceManagement.exception;

import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AttendanceException.class)
    public ResponseEntity<StandardResponse> handleAttendanceException(AttendanceException ex) {
        return new ResponseEntity<>(
            new StandardResponse(ex.getStatusCode(), "error", ex.getMessage()),
            HttpStatus.valueOf(ex.getStatusCode())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardResponse> handleGenericException(Exception ex) {
        return new ResponseEntity<>(
            new StandardResponse(500, "error", "An unexpected error occurred: " + ex.getMessage()),
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
} 