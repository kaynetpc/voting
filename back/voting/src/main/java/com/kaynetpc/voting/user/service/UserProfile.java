package com.kaynetpc.voting.user.service;

import java.util.List;

import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.UserDetails;

public class UserProfile {
    private String title;    
    private String firstName;
    private String lastName;
    private String gender;    
    private String email;
    private String addressOne;
    private String addressTwo;
    private String dateOfBirth;
    private String image;


    private List<UserDetails> userDetails;

    
    public UserProfile(User user) {
        this.title = user.getTitle();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.gender = user.getGender();
        this.email = user.getEmail();
        this.addressOne = user.getAddressOne();
        this.addressTwo = user.getAddressTwo();
        this.dateOfBirth = user.getDateOfBirth();
        this.image = user.getImage();
        this.image = user.getImage();
        this.userDetails = user.getUserDetails();
    }
    


    public UserProfile() {
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getFirstName() {
        return firstName;
    }


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getLastName() {
        return lastName;
    }


    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getGender() {
        return gender;
    }


    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getAddressOne() {
        return addressOne;
    }


    public void setAddressOne(String addressOne) {
        this.addressOne = addressOne;
    }


    public String getAddressTwo() {
        return addressTwo;
    }


    public void setAddressTwo(String addressTwo) {
        this.addressTwo = addressTwo;
    }


    public String getDateOfBirth() {
        return dateOfBirth;
    }


    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }


    public String getImage() {
        return image;
    }


    public void setImage(String image) {
        this.image = image;
    }



    public List<UserDetails> getUserDetails() {
        return userDetails;
    }



    public void setUserDetails(List<UserDetails> userDetails) {
        this.userDetails = userDetails;
    }


    
    
}
