package com.example.InstaLearn.attendanceManagement.repo;

import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {

    List<Attendance> findByStudent_StudentId(String studentId);

    @Query("SELECT a FROM Attendance a ORDER BY a.student.studentId, a.createdAt DESC")
    List<Attendance> findAllAttendance();

    List<Attendance> findByClassType_ClassTypeId(long classId);
}
