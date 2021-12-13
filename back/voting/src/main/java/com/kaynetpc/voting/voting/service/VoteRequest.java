package com.kaynetpc.voting.voting.service;

public class VoteRequest {
    
    private String candidateId;
    private int postId;
    private String userId;
    private String electionName;

    
    public VoteRequest() {
    }
    public VoteRequest(String candidateId, int postId, String userId, String electionName) {
        this.candidateId = candidateId;
        this.postId = postId;
        this.userId = userId;
        this.electionName = electionName;
    }
    public String getCandidateId() {
        return candidateId;
    }
    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }
    public int getPostId() {
        return postId;
    }
    public void setPostId(int postId) {
        this.postId = postId;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getElectionName() {
        return electionName;
    }
    public void setElectionName(String electionName) {
        this.electionName = electionName;
    }



    
}
