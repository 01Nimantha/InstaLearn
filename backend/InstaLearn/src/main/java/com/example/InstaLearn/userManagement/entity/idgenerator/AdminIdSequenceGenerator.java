package com.example.InstaLearn.userManagement.entity.idgenerator;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class AdminIdSequenceGenerator {
    private static int currentId;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    private void initialize() {
        // Query the maximum buyer_id from the database
        Integer maxId = jdbcTemplate.queryForObject(
                "SELECT MAX(CAST(SUBSTRING(admin_id, 9) AS UNSIGNED)) FROM admin",
                Integer.class
        );

        // If the database is empty, start at 10000; otherwise, continue from the maxId
        currentId = (maxId != null) ? maxId + 1 : 10000;
    }

    public static synchronized int getNextId() {
        return currentId++;
    }
}
