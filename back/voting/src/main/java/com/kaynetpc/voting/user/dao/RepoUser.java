package com.kaynetpc.voting.user.dao;

import java.util.Optional;

import com.kaynetpc.voting.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoUser extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);
    
}
