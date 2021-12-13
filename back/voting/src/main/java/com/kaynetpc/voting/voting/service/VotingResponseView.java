package com.kaynetpc.voting.voting.service;

import java.util.ArrayList;
import java.util.List;

import com.kaynetpc.voting.model.Voting;

public class VotingResponseView {
    private List<Voting> list = new ArrayList<>();
    private int total;
    private long votes;


    public VotingResponseView(List<Voting> list, int total, long votes) {
        this.list = list;
        this.total = total;
        this.votes = votes;
    }


    public VotingResponseView() {
    }


    public List<Voting> getList() {
        return list;
    }


    public void setList(List<Voting> list) {
        this.list = list;
    }


    public int getTotal() {
        return total;
    }


    public void setTotal(int total) {
        this.total = total;
    }


    public long getVotes() {
        return votes;
    }


    public void setVotes(long votes) {
        this.votes = votes;
    }


    

    
}
