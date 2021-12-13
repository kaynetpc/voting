package com.kaynetpc.voting.voting.dao;

import com.kaynetpc.voting.model.Votes;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoVotes extends JpaRepository<Votes, Long> {
    
}
