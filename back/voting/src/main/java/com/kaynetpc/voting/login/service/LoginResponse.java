package com.kaynetpc.voting.login.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kaynetpc.voting.model.Role;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.UserRoles;

public class LoginResponse {
    private String username;
    private String gender;
    private String image;
    private String title;
    private String date;
    private String lastName;
    private String firstName;
    private String dateOfBirth;
    private int status = 0; /**1 connected, 2, blocked , 0 not exist */
    private String message = "";
    private List<Integer> rolesId = new ArrayList<>();

    
    public LoginResponse(User user, String date, int status, String message, List<UserRoles> userRoles) {
        this.username = user.getUserId();
        this.gender = user.getGender();
        this.image = user.getImage();
        this.title = user.getTitle();
        this.date = date;
        this.lastName = user.getLastName();
        this.firstName = user.getFirstName();
        this.dateOfBirth = user.getDateOfBirth();
        this.status = status;
        this.message = message;
        this.rolesId = extractRoleIds(userRoles, user.getUserType());
    }

    private List<Integer> extractRoleIds(List<UserRoles> list, String Type){
        List<Integer> res = new ArrayList<>();
        Optional<UserRoles> ur = userRoles(list, Type);

        if(ur.isPresent()){
            List<Role> roleList = ur.get().getRoles();
            for(Role e : roleList){
                res.add(e.getId());
            }
        }
        return res;
    }
    

    Optional<UserRoles> userRoles(List<UserRoles> list, String type){
        Optional<UserRoles> res = Optional.empty();
        for(UserRoles e : list){
            if(e.getType().equalsIgnoreCase(type)){
                return res = Optional.of(e);
            }
        }
        return res;
    }


    
    public LoginResponse() {
    }



    public String getUsername() {
        return username;
    }



    public void setUsername(String username) {
        this.username = username;
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



    public String getTitle() {
        return title;
    }



    public void setTitle(String title) {
        this.title = title;
    }



    public String getDate() {
        return date;
    }



    public void setDate(String date) {
        this.date = date;
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



    public String getDateOfBirth() {
        return dateOfBirth;
    }



    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }



    public int getStatus() {
        return status;
    }



    public void setStatus(int status) {
        this.status = status;
    }



    public String getMessage() {
        return message;
    }



    public void setMessage(String message) {
        this.message = message;
    }

    public List<Integer> getRolesId() {
        return rolesId;
    }

    public void setRolesId(List<Integer> rolesId) {
        this.rolesId = rolesId;
    }

    

    

}
