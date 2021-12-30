package com.kaynetpc.voting.user.controller;

import java.util.List;

import com.kaynetpc.voting.login.service.LoginResponse;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.UserTypes;
import com.kaynetpc.voting.user.service.UserResponse;
import com.kaynetpc.voting.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/user")
public class ConUser {
    @Autowired UserService service;


    /**Create user URL */
    @PostMapping(value="reg")
    public LoginResponse addNewUser(@RequestBody User entity) {        
        return service.createNewUser(entity);
    }

    /**Get user profile URL */
    @GetMapping(value="/profile")
    public Object userProfile(@RequestParam String userId) {        
        return service.getUserProfile(userId);
    }

    @GetMapping(value="/get/list")
    public List<UserResponse> getUserList() {
        return service.getUsersList();
    }


    @PostMapping(value = "/create/type")
    public String createUserTypes(@RequestBody List<UserTypes> e){
        return service.createUserTypes(e);
    }

    @GetMapping(value = "/list/type")
    public List<UserTypes> getUserTypes(){
        return service.getUserTypes();
    }
    

    
    
}
