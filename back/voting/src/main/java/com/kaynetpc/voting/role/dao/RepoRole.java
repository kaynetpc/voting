package com.kaynetpc.voting.role.dao;

import java.util.List;

import com.kaynetpc.voting.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoRole extends JpaRepository<Role, Long> {

    List<Role> findByIdIn(List<Integer> roles);
    
}
