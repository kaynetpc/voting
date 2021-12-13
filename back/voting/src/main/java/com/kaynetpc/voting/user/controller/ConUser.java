package com.kaynetpc.voting.user.controller;

import com.kaynetpc.voting.login.service.LoginResponse;
import com.kaynetpc.voting.model.User;
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

    /**Create user URL */
    @GetMapping(value="profile")
    public Object userProfile(@RequestParam String userId) {        
        return service.getUserProfile(userId);
    }

    
    
}
