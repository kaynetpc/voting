package com.kaynetpc.voting.login.service;

import java.util.Optional;

import com.kaynetpc.voting.login.dao.RepoAuthentication;
import com.kaynetpc.voting.model.Authentication;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.user.dao.RepoUser;
import com.kaynetpc.voting.utils.Constant;
import com.kaynetpc.voting.utils.Helper;
import com.kaynetpc.voting.utils.Messages;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LoginService {

    @Autowired RepoAuthentication repoAuthentication;
    @Autowired RepoUser repoUser;

    Messages MSG = new Messages();
    Helper help = new Helper();

    Constant constant = new Constant();

    public String todaysDate = help.getTodaysDate();

    
    private String pattern(long id){
        String pattern  =  "US-";

        return pattern+id;
    }


    /**Create User */
    public Authentication createUser(User user){

        String userId = pattern(user.getId());

        user.setUserId(userId);
        
        Authentication auth = new Authentication();
        auth.setUserId(userId);

        auth.setPassword(hashPassword(user.getPassword()));

        if(repoAuthentication.save(auth).getId() > 0){
            /**update user password */
            repoUser.save(user);
            /** return user login details */
            return auth;
        } else {
            return new Authentication();
        }
    }


    public LoginResponse autLogin(LoginRequest login) {

        LoginResponse res = new LoginResponse();
        String userId = login.getUsername();

        /**Check if is admin */

        try {
            if(login.getUsername().equalsIgnoreCase(constant.sysUsername()) && login.getPasskey().equals(constant.sysPassword())){
                res.setDate(todaysDate);
                res.setTitle("Mr");
                res.setLastName("Akinwumi");
                res.setFirstName("Kayode");
                res.setUsername("KNT");
                res.setMessage(MSG.loginSuccess());
                res.setStatus(help.connected);
                System.out.println("____________LOGIN_______");
                return res;
            } else {
                Optional<User> user = repoUser.findByUserId(userId);
                
        
                if(user.isPresent()){
                    Authentication aut = repoAuthentication.getByUserId(userId).get();
                    if(hashMatch(login.getPasskey(), aut.getPassword())){
                        res = new LoginResponse(user.get(), todaysDate, help.connected, MSG.loginSuccess());
                    } else {
                        res = new LoginResponse(new User(), todaysDate, help.incorrect, MSG.invalidCredential());
                    }
                } else {
                    User user2 = new User();
                    user2.setUserId(userId);
                    res = new LoginResponse(user2 , todaysDate, help.not_exist, MSG.invalidCredential());
                }
                return res;
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            return res;
        }


    }



    private Boolean hashMatch(String password, String hash2){
        return BCrypt.checkpw(password, hash2);
    }

    private String hashPassword(String password){
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
