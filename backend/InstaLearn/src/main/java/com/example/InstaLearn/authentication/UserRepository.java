package com.example.InstaLearn.authentication;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AuthenticationUser, Long> {
    Optional<AuthenticationUser> findByUsername(String username);
}
