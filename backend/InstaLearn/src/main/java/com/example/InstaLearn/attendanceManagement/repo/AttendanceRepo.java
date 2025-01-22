package com.example.InstaLearn.attendanceManagement.repo;

import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {
}
