package com.kaynetpc.voting.login.controller;

import com.kaynetpc.voting.login.service.LoginRequest;
import com.kaynetpc.voting.login.service.LoginResponse;
import com.kaynetpc.voting.login.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class ConLogin {
    
    @Autowired LoginService service;

    /**Login User */
    @PostMapping(value = "/login")
    public LoginResponse loginUser(@RequestBody LoginRequest entity){
        return service.autLogin(entity);
    }
}
