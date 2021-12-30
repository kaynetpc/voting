package com.kaynetpc.voting.role.dao;
import java.util.Optional;

import com.kaynetpc.voting.model.UserRoles;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RepoUserRoles extends JpaRepository<UserRoles, Integer> {

    Optional<UserRoles> findByType(String type);
    
}
