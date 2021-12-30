package com.kaynetpc.voting.election.controller;

import java.util.List;

import com.kaynetpc.voting.election.service.ContestantService;
import com.kaynetpc.voting.election.service.ContestantsRequest;
import com.kaynetpc.voting.election.service.ElectionResponse;
import com.kaynetpc.voting.model.Contestants;
import com.kaynetpc.voting.model.Election;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/election")
public class ConController {

    @Autowired ContestantService service;


    @PostMapping(value = "/create")
    public String createElection(@RequestBody List<Election> entities){
        return service.addElection(entities);
    }

    @GetMapping(value = "/get/list")
    public List<ElectionResponse> getList(){
        return service.getElectionList();
    }


    @PostMapping(value = "/add/req/contestant")
    public String makeRequest(@RequestBody List<ContestantsRequest> entities){
        return service.addContestant(entities);
    }


    @GetMapping(value = "/get/contestant")
    public List<Contestants> getRequestList(){
        return service.getContestantList();
    }
}
