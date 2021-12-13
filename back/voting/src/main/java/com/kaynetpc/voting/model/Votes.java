package com.kaynetpc.voting.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Voting
 */
@Entity
public class Votes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String votersId;
    private String candidateId;
    private String electionName;


    
    
    

    public Votes(String votersId, String candidateId, String electionName) {
        this.votersId = votersId;
        this.candidateId = candidateId;
        this.electionName = electionName;
    }



    public Votes() {
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    
    public String getVotersId() {
        return votersId;
    }

    public void setVotersId(String votersId) {
        this.votersId = votersId;
    }



    public String getCandidateId() {
        return candidateId;
    }



    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }



    public String getElectionName() {
        return electionName;
    }



    public void setElectionName(String electionName) {
        this.electionName = electionName;
    }


    
    
}
