package com.kaynetpc.voting.category.dao;

import com.kaynetpc.voting.model.ElectionLevelHierarchy;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoPostHierarchy extends JpaRepository<ElectionLevelHierarchy, Long> {
    
}
