package com.kaynetpc.voting.election.dao;

import java.util.Optional;

import com.kaynetpc.voting.model.Election;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoElection extends JpaRepository<Election, Long> {

    Optional<Election> findByName(String electionName);
    
}
