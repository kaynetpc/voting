package com.kaynetpc.voting.voting.service;

import java.util.List;

import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.Votes;
import com.kaynetpc.voting.model.Voting;

public class VotingResponseView {
    private String postName;
    private String lastName;
    private String firstName;
    private String gender;
    private String image;
    private long total;
    private List<Votes> votes;


    public VotingResponseView(Voting voting, String postName, User user) {
        this.postName = postName;
        this.firstName =  user.getFirstName();
        this.lastName = user.getLastName();
        this.image = user.getImage();
        this.gender = user.getGender();
        this.total = voting.getVotes().size();
        this.votes = voting.getVotes();
    }


    public VotingResponseView() {
    }




    public String getPostName() {
        return postName;
    }


    public void setPostName(String postName) {
        this.postName = postName;
    }


    public String getLastName() {
        return lastName;
    }


    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getFirstName() {
        return firstName;
    }


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getGender() {
        return gender;
    }


    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getImage() {
        return image;
    }


    public void setImage(String image) {
        this.image = image;
    }


    public long getTotal() {
        return total;
    }


    public void setTotal(long total) {
        this.total = total;
    }


    public List<Votes> getVotes() {
        return votes;
    }


    public void setVotes(List<Votes> votes) {
        this.votes = votes;
    }




    

    
}
