package com.example.InstaLearn.attendanceManagement.repo;

import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.userManagement.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.List;
import java.util.Date;
import java.util.Optional;

public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {
    

    List<Attendance> findByStudent_StudentId(String studentId);

    @Query("SELECT a FROM Attendance a ORDER BY a.student.studentId, a.createdAt DESC")
    List<Attendance> findAllAttendance();

    List<Attendance> findByClassType_ClassTypeId(long classId);

    List<Attendance> findByClassTypeAndCreatedAt(ClassType classType, LocalDate createdAt);

    int countByCreatedAtAndPresentState(LocalDate localDate, boolean b);
    
    @Query("SELECT a FROM Attendance a WHERE a.student.studentId = :studentId AND a.createdAt = :date AND HOUR(a.timeRecorded) = HOUR(:time)")
    List<Attendance> findByStudentAndDateAndHour(@Param("studentId") String studentId, @Param("date") LocalDate date, @Param("time") LocalTime time);

    @Modifying
    @Transactional
    @Query("DELETE FROM Attendance a WHERE YEAR(a.createdAt) != YEAR(CURRENT_DATE) OR MONTH(a.createdAt) != MONTH(CURRENT_DATE)")
    void deleteNonCurrentMonthRecords();
}
