package com.kaynetpc.voting.utils;

public class Messages {

    public String saveMSG(){
        return "Saved!";
    }
    
    public String errorMSG(){
        return "Error Occur!";
    }
    
    public String loginSuccess(){
        return "Login Success!";
    }
    
    public String userAlreadyExist(){
        return "User Already Exist!";
    }
    
    public String invalidCredential(){
        return "Username Or password is incorrect!";
    }

    /**Vote messages */

    public String voteSubmitMSG(){
        return "Vote Submitted!";
    }

    public String electionExpiredOrNotPresent(){
        return "Permission No granted  vote rejected, kindly check election date period and try again!";
    }
    
}
