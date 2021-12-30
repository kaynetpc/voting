package com.kaynetpc.voting.category.controller;

import java.util.List;

import com.kaynetpc.voting.category.service.ElectionLevelHierarchyService;
import com.kaynetpc.voting.category.service.ElectionPostRequest;
import com.kaynetpc.voting.model.PostNames;
import com.kaynetpc.voting.model.ElectionLevelHierarchy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/cat")
public class ConCategory {
    @Autowired ElectionLevelHierarchyService service;

    @PostMapping(value = "/create")
    public String createPostHierarchy(@RequestBody List<ElectionLevelHierarchy> entities){
        return service.createElectionHierarchy(entities);
    }

    @PostMapping(value = "/create/posts")
    public String createPosts(@RequestBody List<ElectionPostRequest> entities){
        return service.createElectionPosts(entities);
    }

    @GetMapping(value = "/get/list")
    public List<ElectionLevelHierarchy> getPostHierarchy(){
        return service.getPostHierarchy();
    }

    @GetMapping(value = "/get")
    public ElectionLevelHierarchy getElectionLevels(@RequestParam String level){
        return service.getPostElectionLevel(level);
    }

    @GetMapping(value = "/name/create")
    public String createPostNames(@RequestBody List<PostNames> entities){
        return service.createPostNames(entities);
    }
}
