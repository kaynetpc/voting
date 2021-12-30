package com.kaynetpc.voting.election.service;

import com.kaynetpc.voting.model.Election;
import com.kaynetpc.voting.model.Posts;

public class ElectionResponse {

    private String name;// unique name
    private String description;
    private String year;
    private String dateCreated;
    private Boolean reuseable;
    private String level; //category level it belong
    private Boolean active = true;
    private String startDate;
    private String endDate;

    private Posts post;

    

    public ElectionResponse(Election el, Posts post) {
        this.name = el.getName();
        this.description = el.getDescription();
        this.year = el.getYear();
        this.dateCreated = el.getDateCreated();
        this.reuseable = el.getReuseable();
        this.level = el.getLevel();
        this.active = el.getActive();
        this.startDate = el.getStartDate();
        this.endDate = el.getEndDate();
        this.post = post;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Boolean getReuseable() {
        return reuseable;
    }

    public void setReuseable(Boolean reuseable) {
        this.reuseable = reuseable;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Posts getPost() {
        return post;
    }

    public void setPost(Posts post) {
        this.post = post;
    }
    
    
}
