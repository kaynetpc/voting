package com.kaynetpc.voting.category.service;

import java.util.ArrayList;
import java.util.List;

import com.kaynetpc.voting.model.Posts;

public class ElectionPostRequest {
    
    private String level;

    private List<Posts> posts = new ArrayList<>();


    
    public ElectionPostRequest() {
    }

    public ElectionPostRequest(String level, List<Posts> posts) {
        this.level = level;
        this.posts = posts;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public List<Posts> getPosts() {
        return posts;
    }

    public void setPosts(List<Posts> posts) {
        this.posts = posts;
    }


    
}
