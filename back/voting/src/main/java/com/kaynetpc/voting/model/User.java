package com.kaynetpc.voting.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String userId;    
    private String title;    
    private String firstName;
    private String lastName;
    private String gender;    
    private String email;
    private String addressOne;
    private String addressTwo;
    private String dateOfBirth;
    private String image;
    private String userType;

    @Transient
    private String password;


    @OneToMany
    private List<UserDetails> userDetails;



    

    

    

    public User(long id, String userId, String firstName, String lastName, String email, String addressOne,
            String addressTwo, String dateOfBirth, String image, List<UserDetails> userDetails, String userType) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.dateOfBirth = dateOfBirth;
        this.image = image;
        this.userDetails = userDetails;
        this.userType = userType;
    }



    public User() {
    }



    public long getId() {
        return id;
    }



    public void setId(long id) {
        this.id = id;
    }



    public String getUserId() {
        return userId;
    }



    public void setUserId(String userId) {
        this.userId = userId;
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



    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {
        this.password = password;
    }



    public String getUserType() {
        return userType;
    }



    public void setUserType(String userType) {
        this.userType = userType;
    }


    




}
