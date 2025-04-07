package com.example.InstaLearn.userManagement.repo;

import com.example.InstaLearn.userManagement.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<Image, Long> {
}
