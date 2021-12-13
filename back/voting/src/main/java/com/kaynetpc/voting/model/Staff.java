package com.kaynetpc.voting.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String userId;    
    private String firstName;
    private String lastName;
    private String email;
    private String post;
    private String addressOne;
    private String addressTwo;
    private String dateOfBirth;

    
    public Staff(long id, String userId, String firstName, String lastName, String email, String post,
            String addressOne, String addressTwo, String dateOfBirth) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.post = post;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.dateOfBirth = dateOfBirth;
    }

    

    public Staff() {
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


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getPost() {
        return post;
    }


    public void setPost(String post) {
        this.post = post;
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

    
    
}
