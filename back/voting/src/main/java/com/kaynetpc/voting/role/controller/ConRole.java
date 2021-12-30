package com.kaynetpc.voting.role.controller;

import java.util.List;

import com.kaynetpc.voting.model.Role;
import com.kaynetpc.voting.role.service.RoleCostumeRequest;
import com.kaynetpc.voting.role.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/role")
public class ConRole {
    @Autowired RoleService service;

    @PostMapping(value = "/init")
    public String initializeRole(@RequestBody List<Role> entities){
        return service.initializeRoles(entities);
    }

    @GetMapping(value = "/get/list")
    public Object getRoleList(){
        return service.getRoleList();
    }

    @PostMapping(value = "/create", produces = "text/json")
    public String assignRole(@RequestBody RoleCostumeRequest rcr){
        return service.assignRole(rcr);
    }
}
