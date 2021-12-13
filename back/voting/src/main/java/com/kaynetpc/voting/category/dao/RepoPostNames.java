package com.kaynetpc.voting.category.dao;

import com.kaynetpc.voting.model.PostNames;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoPostNames extends JpaRepository<PostNames, Long> {
    
}
