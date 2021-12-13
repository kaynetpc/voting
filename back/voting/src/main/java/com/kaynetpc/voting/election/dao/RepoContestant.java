package com.kaynetpc.voting.election.dao;

import com.kaynetpc.voting.model.Contestants;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoContestant extends JpaRepository<Contestants, Long> {
    


}
