package com.example.InstaLearn.userManagement.repo;

import com.example.InstaLearn.userManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface StudentRepo extends JpaRepository<Student, String>{

    @Query("SELECT s.studentId FROM Student s")
    List<String> findAllStudentIds();
}
