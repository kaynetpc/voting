package com.kaynetpc.voting.user.dao;

import java.util.Optional;

import com.kaynetpc.voting.model.UserTypes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoUserTypes extends JpaRepository<UserTypes, Integer> {

    Optional<UserTypes> findByName(String name);
    
}
