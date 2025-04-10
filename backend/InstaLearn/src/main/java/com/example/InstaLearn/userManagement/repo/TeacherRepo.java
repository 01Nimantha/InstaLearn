package com.example.InstaLearn.userManagement.repo;


import com.example.InstaLearn.userManagement.entity.Teacher;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
//@Transactional
public interface TeacherRepo extends JpaRepository<Teacher, String> {
    Page<Teacher> findByTeacherIdContainingOrTeacherNameContaining(String searchTerm, String searchTerm1, Pageable pageable);
}
