package com.example.InstaLearn.userManagement.repo;

import com.example.InstaLearn.userManagement.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface ParentRepo extends JpaRepository<Parent, String>{

}

