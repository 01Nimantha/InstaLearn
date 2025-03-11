package com.example.InstaLearn.attendanceManagement.repo;

import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {

    int countByDateAndPresentState(LocalDate date, boolean presentState);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.date = :date AND a.presentState = true")

    int getPresentCount(@Param("date") LocalDate date);

    List<Attendance> findByStudent_StudentId(String studentId);

    @Query("SELECT a FROM Attendance a ORDER BY a.student.studentId, a.createdAt DESC")
    List<Attendance> findAllAttendance();

    List<Attendance> findByClassType_ClassTypeId(long classId);

    List<Attendance> findByClassTypeAndCreatedAt(ClassType classType, LocalDate createdAt);
}
