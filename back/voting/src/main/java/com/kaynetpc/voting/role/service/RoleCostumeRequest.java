package com.kaynetpc.voting.role.service;

import java.util.ArrayList;
import java.util.List;

public class RoleCostumeRequest {
    private List<String> rolesId = new ArrayList<>();
    private String type;

    public RoleCostumeRequest() {
    }

    public RoleCostumeRequest(List<String> rolesId, String type) {
        this.rolesId = rolesId;
        this.type = type;
    }

    public List<String> getRolesId() {
        return rolesId;
    }

    public void setRolesId(List<String> rolesId) {
        this.rolesId = rolesId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    


    
}
