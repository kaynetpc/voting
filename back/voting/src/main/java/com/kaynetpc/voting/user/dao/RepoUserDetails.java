package com.kaynetpc.voting.user.dao;

import com.kaynetpc.voting.model.UserDetails;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoUserDetails extends JpaRepository<UserDetails, Long> {
    
}
