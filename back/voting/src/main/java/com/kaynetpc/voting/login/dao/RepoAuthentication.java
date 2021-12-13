package com.kaynetpc.voting.login.dao;

import java.util.Optional;

import com.kaynetpc.voting.model.Authentication;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoAuthentication extends JpaRepository<Authentication, Long> {

    Optional<Authentication> getByUserId(String userId);
    
}
