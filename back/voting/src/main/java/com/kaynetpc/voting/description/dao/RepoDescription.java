package com.kaynetpc.voting.description.dao;

import com.kaynetpc.voting.model.Description;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoDescription extends JpaRepository<Description, Long> {
    
}
