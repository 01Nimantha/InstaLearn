package com.example.InstaLearn.scheduleManagement.repo;

import com.example.InstaLearn.scheduleManagement.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository<Event,Integer>{
}
