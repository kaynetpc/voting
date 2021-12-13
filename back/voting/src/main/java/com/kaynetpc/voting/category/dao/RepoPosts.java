package com.kaynetpc.voting.category.dao;

import com.kaynetpc.voting.model.Posts;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoPosts extends JpaRepository<Posts, Integer> {
    
}
