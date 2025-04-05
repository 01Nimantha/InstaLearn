package com.example.InstaLearn.progressManagement.repo;

import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.userManagement.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface MarksRepo extends JpaRepository<Marks, Integer> {

//    Marks findByStudentIdEquals(String studentId);

    List<Marks> findByStudentId(String studentId);

    Page<Marks> findAll(Pageable pageable);

    List<Marks> findByMonth(String month);

    @Query("SELECT m.month, AVG(m.marks) FROM Marks m GROUP BY m.month ORDER BY FIELD(m.month, 'January', 'February', 'March', 'April')")
    List<Object[]> calculateMonthlyAverageMarks();


    Page<Marks> findByStudentId(String studentId, Pageable pageable);

    @Query("SELECT DISTINCT m.studentId FROM Marks m")
    Page<String> findDistinctStudentIds(Pageable pageable);


}
