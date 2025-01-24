package com.example.InstaLearn.progressManagement.repo;

import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.userManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface MarksRepo extends JpaRepository<Marks, Integer> {

    Marks findByStudentIdEquals(String studentId);
}
