package com.example.InstaLearn.dashboardManagement.repo;

import com.example.InstaLearn.dashboardManagement.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface NoticeRepo extends JpaRepository<Notice, Integer> {
}
