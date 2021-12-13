package com.kaynetpc.voting.voting.dao;

import java.util.List;
import java.util.Optional;

import com.kaynetpc.voting.model.Voting;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoVoting extends JpaRepository<Voting, Long> {

    Optional<Voting> findByCandidateId(String candidateId);

    Optional<Voting> findByCandidateIdAndElectionName(String candidateId, String electionName);

    List<Voting> findByElectionName(String electionName);
    
}
