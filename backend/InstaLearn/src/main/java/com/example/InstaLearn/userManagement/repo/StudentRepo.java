package com.example.InstaLearn.userManagement.repo;

import com.example.InstaLearn.userManagement.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface StudentRepo extends JpaRepository<Student, String>{

    @Query("SELECT s.studentId FROM Student s")
    List<String> findAllStudentIds();

    @Query("SELECT s FROM Student s JOIN s.classTypes c WHERE c.classTypeId = :classTypeId")
    List<Student> findStudentsByClassId(@Param("classTypeId") Long classTypeId);

    Page<Student> findByStudentIdContainingOrStudentNameContaining(String searchTerm, String searchTerm1, Pageable pageable);
}
