package com.kaynetpc.voting.voting.service;

import java.util.ArrayList;
import java.util.List;

import com.kaynetpc.voting.model.Election;
import com.kaynetpc.voting.model.Posts;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.Votes;

public class CostumeVoting {
    private long id;

    private User user;
    private Posts post;
    private Election electionType;
    private long totalVote;
    
    private List<Votes> votes = new ArrayList<>();


    

    public CostumeVoting(User user, Posts post, Election electionType, long totalVote, List<Votes> votes) {
        this.user = user;
        this.post = post;
        this.electionType = electionType;
        this.totalVote = totalVote;
        this.votes = votes;
    }


    
    public long getId() {
        return id;
    }



    public void setId(long id) {
        this.id = id;
    }



    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Posts getPost() {
        return post;
    }

    public void setPost(Posts post) {
        this.post = post;
    }

    public Election getElectionType() {
        return electionType;
    }

    public void setElectionType(Election electionType) {
        this.electionType = electionType;
    }

    public long getTotalVote() {
        return totalVote;
    }

    public void setTotalVote(long totalVote) {
        this.totalVote = totalVote;
    }

    public List<Votes> getVotes() {
        return votes;
    }

    public void setVotes(List<Votes> votes) {
        this.votes = votes;
    }


    



}
