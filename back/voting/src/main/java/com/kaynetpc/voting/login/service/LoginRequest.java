package com.kaynetpc.voting.login.service;

public class LoginRequest {
    private String username;
    private String passkey;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPasskey() {
        return passkey;
    }
    public void setPasskey(String passkey) {
        this.passkey = passkey;
    }
    public LoginRequest(String username, String passkey) {
        this.username = username;
        this.passkey = passkey;
    }
    public LoginRequest() {
    }

    

}
