package com.example.InstaLearn.classFeesManagement.repo;

import com.example.InstaLearn.classFeesManagement.enity.ClassFees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface ClassFeesRepo extends JpaRepository<ClassFees, Long> {
    Optional<ClassFees> findByClassName(String className);

    ClassFees findAmountByClassName(String className);
}
