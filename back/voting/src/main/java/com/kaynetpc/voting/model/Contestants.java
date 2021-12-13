package com.kaynetpc.voting.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;


@Entity
public class Contestants {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name; /**Election Name */

    private String level; /**Election Level */
    private String date;
    
    @OneToOne
    private Posts post;

    @OneToMany
    private List<Description> descriptions;

    

    private String userId;
    private String title;
    private String firstName;
    private String lastName;
    private String gender;
    private String image;

    private String aim;
    private String objective;


    

 

    

   

    public Contestants(String name, String level, String date, Posts post, List<Description> descriptions,
            String userId, String title, String firstName, String lastName, String gender, String image, String aim,
            String objective, long postId) {
        this.name = name;
        this.level = level;
        this.date = date;
        this.post = post;
        this.descriptions = descriptions;
        this.userId = userId;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.image = image;
        this.aim = aim;
        this.objective = objective;
        this.postId = postId;
    }


    public Contestants() {
    }




    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getImage() {
        return image;
    }


    public void setImage(String image) {
        this.image = image;
    }




    @Transient
    private long postId;


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


    public String getLevel() {
        return level;
    }


    public void setLevel(String level) {
        this.level = level;
    }


    public String getDate() {
        return date;
    }


    public void setDate(String date) {
        this.date = date;
    }


    public Posts getPost() {
        return post;
    }


    public void setPost(Posts post) {
        this.post = post;
    }


    public List<Description> getDescriptions() {
        return descriptions;
    }


    public void setDescriptions(List<Description> descriptions) {
        this.descriptions = descriptions;
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


    public String getGender() {
        return gender;
    }


    public void setGender(String gender) {
        this.gender = gender;
    }


    public long getPostId() {
        return postId;
    }


    public void setPostId(long postId) {
        this.postId = postId;
    }


    public String getAim() {
        return aim;
    }


    public void setAim(String aim) {
        this.aim = aim;
    }


    public String getObjective() {
        return objective;
    }


    public void setObjective(String objective) {
        this.objective = objective;
    }



    
}
