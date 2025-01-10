package com.example.InstaLearn.userManagement.repo;


import com.example.InstaLearn.userManagement.entity.Teacher;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
//@Transactional
public interface TeacherRepo extends JpaRepository<Teacher, Integer> {
}
