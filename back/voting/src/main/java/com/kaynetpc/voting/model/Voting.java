package com.kaynetpc.voting.model;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * Voting
 */
@Entity
public class Voting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String candidateId;

    private long postId;

    private String electionName;
    
    @OneToMany
    private List<Votes> votes = new ArrayList<>();


    

    public Voting() {
    }

    public Voting(String candidateId, long postId, String electionName, List<Votes> votes) {
        this.candidateId = candidateId;
        this.postId = postId;
        this.electionName = electionName;
        this.votes = votes;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    
    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public List<Votes> getVotes() {
        return votes;
    }

    public void setVotes(List<Votes> votes) {
        this.votes = votes;
    }

    public String getElectionName() {
        return electionName;
    }

    public void setElectionName(String electionName) {
        this.electionName = electionName;
    }
    
}