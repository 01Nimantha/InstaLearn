package com.example.InstaLearn.progressManagement.repo;

import com.example.InstaLearn.progressManagement.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface MarksRepo extends JpaRepository<Marks, Integer> {
}
