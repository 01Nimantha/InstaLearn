package com.example.InstaLearn.attendanceManagement.repo;

import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {

    int countByDateAndPresentState(LocalDate date, boolean presentState);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.date = :date AND a.presentState = true")

    int getPresentCount(@Param("date") LocalDate date);
}
