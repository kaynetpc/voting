package com.kaynetpc.voting.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private long id; 

    private String name; // SUG
    private String title; // President
    private String aim; // 
    private String descriptions; // 
    private String level; // 
    private String objective; // 
    private String status; // 
    private Boolean active = true; // 
    private Boolean approved; // 

    
    public Posts() {
    }


   


    public Posts(String name, String title, Boolean active, String aim, String descriptions, String level,
            String objective, String status, Boolean approved) {
        this.name = name;
        this.title = title;
        this.active = active;
        this.aim = aim;
        this.descriptions = descriptions;
        this.level = level;
        this.objective = objective;
        this.status = status;
        this.approved = approved;
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





    public String getTitle() {
        return title;
    }





    public void setTitle(String title) {
        this.title = title;
    }





    public Boolean getActive() {
        return active;
    }





    public void setActive(Boolean active) {
        this.active = active;
    }





    public String getAim() {
        return aim;
    }





    public void setAim(String aim) {
        this.aim = aim;
    }





    public String getDescriptions() {
        return descriptions;
    }





    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }





    public String getLevel() {
        return level;
    }





    public void setLevel(String level) {
        this.level = level;
    }





    public String getObjective() {
        return objective;
    }





    public void setObjective(String objective) {
        this.objective = objective;
    }





    public String getStatus() {
        return status;
    }





    public void setStatus(String status) {
        this.status = status;
    }





    public Boolean getApproved() {
        return approved;
    }





    public void setApproved(Boolean approved) {
        this.approved = approved;
    }


    

    

}
