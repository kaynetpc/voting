package com.kaynetpc.voting.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Election {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;// unique name
    private String description;
    private String year;
    private String dateCreated;
    private Boolean reuseable;
    private String level; //category level it belong
    private long postId; //category level it belong
    private Boolean active = true;
    private String startDate;
    private String endDate;

    
    public Election() {
    }
   
    
    public Election(String name, String description, String year, String dateCreated, Boolean reuseable,
            String level, Boolean active, String startDate, String endDate, long postId) {
        this.name = name;
        this.description = description;
        this.year = year;
        this.dateCreated = dateCreated;
        this.reuseable = reuseable;
        this.level = level;
        this.active = active;
        this.startDate = startDate;
        this.endDate = endDate;
        this.postId = postId;
    }


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
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


    public long getPostId() {
        return postId;
    }


    public void setPostId(long postId) {
        this.postId = postId;
    }

    
    

}
