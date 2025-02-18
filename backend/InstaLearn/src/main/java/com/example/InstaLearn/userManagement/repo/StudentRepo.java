package com.example.InstaLearn.userManagement.repo;

import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface StudentRepo extends JpaRepository<Student, String>{


}
