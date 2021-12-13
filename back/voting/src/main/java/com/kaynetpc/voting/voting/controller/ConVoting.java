package com.kaynetpc.voting.voting.controller;

import java.util.List;

import com.kaynetpc.voting.model.Voting;
import com.kaynetpc.voting.voting.service.CostumeVoting;
import com.kaynetpc.voting.voting.service.VoteRequest;
import com.kaynetpc.voting.voting.service.VotingResponseView;
import com.kaynetpc.voting.voting.service.VotingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/vote")
public class ConVoting {
    @Autowired VotingService service;


    @PostMapping(value = "/add")
    public String add(@RequestBody List<Voting> entities){
        return service.addCandidate(entities);
    }

    @PostMapping(value = "/v")
    public String vote(@RequestBody VoteRequest entities){
        return service.makeVote(entities);
    }

    @GetMapping(value = "/list")
    public VotingResponseView  getVotingList(@RequestParam String electionName){
        return service.getVotingList(electionName);
    }

    @GetMapping(value = "/detail/list")
    public List<CostumeVoting>  getVotingListDetail(@RequestParam String electionName){
        return service.getVotingListDetail(electionName);
    }


}
