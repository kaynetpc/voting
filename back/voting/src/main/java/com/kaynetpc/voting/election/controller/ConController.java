package com.kaynetpc.voting.election.controller;

import java.util.List;

import com.kaynetpc.voting.election.service.ContestantService;
import com.kaynetpc.voting.model.Contestants;

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


    @PostMapping(value = "/add/req/contestant")
    public String makeRequest(@RequestBody List<Contestants> entities){
        return service.addContestant(entities);
    }


    @GetMapping(value = "/get/contestant")
    public List<Contestants> getRequestList(){
        return service.getContestantList();
    }
}
