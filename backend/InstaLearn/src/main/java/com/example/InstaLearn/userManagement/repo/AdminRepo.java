package com.example.InstaLearn.userManagement.repo;

import com.example.InstaLearn.userManagement.entity.Admin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface AdminRepo extends JpaRepository<Admin, String> {

    Page<Admin> findByAdminIdContainingOrAdminNameContaining(String searchTerm, String searchTerm1, Pageable pageable);
}
