package com.example.InstaLearn.userManagement.repo;

import com.example.InstaLearn.userManagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
@EnableJpaRepositories

public interface UserRepo extends JpaRepository<User, Integer> {
}
