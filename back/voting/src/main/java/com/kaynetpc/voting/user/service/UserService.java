package com.kaynetpc.voting.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kaynetpc.voting.login.service.LoginRequest;
import com.kaynetpc.voting.login.service.LoginResponse;
import com.kaynetpc.voting.login.service.LoginService;
import com.kaynetpc.voting.model.Authentication;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.UserDetails;
import com.kaynetpc.voting.user.dao.RepoUser;
import com.kaynetpc.voting.user.dao.RepoUserDetails;
import com.kaynetpc.voting.utils.Helper;
import com.kaynetpc.voting.utils.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired RepoUser repoUser;
    @Autowired RepoUserDetails repoUserDetails;

    @Autowired LoginService loginService;


    Messages MSG = new Messages();
    Helper help = new Helper();

    public LoginResponse createNewUser(User entity){
        List<User> list = repoUser.findAll();
        
        
        /**Adding New User */
        User user = entity;
        
        if(!checkUser(list, user).isPresent()){
            
            List<UserDetails> uDetails =  new ArrayList<>();

            if(user.getUserDetails() != null) user.getUserDetails().forEach(usd -> {
                if(!checkUserDetails(uDetails, usd).isPresent()){
                    uDetails.add(usd);
                }
            });

            user.setUserDetails(uDetails);
            String reqPassword = user.getPassword();

            repoUserDetails.saveAll(uDetails);

            user.setPassword("");

            User nUser  = repoUser.save(user);

            nUser.setPassword(reqPassword);

            Authentication auth  = loginService.createUser(nUser);

            LoginRequest login = new LoginRequest();

            login.setPasskey(reqPassword);
            login.setUsername(auth.getUserId());

            return loginService.autLogin(login);

        } else {
            /**Updating Existing user */
            return new LoginResponse(new User(), "date", help.failed, MSG.userAlreadyExist());
            
        }
        

    }


    public Object getUserProfile(String userId){
        Optional<User> user = repoUser.findByUserId(userId);
        if(user.isPresent()){
            return new UserProfile(user.get());
        } else return MSG.invalidCredential(); 
    }

    Optional<User> checkUser(List<User> list, User user){
        Optional<User> res = Optional.empty();
        for(User e : list){
            if(e.getEmail().equalsIgnoreCase(user.getEmail())){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<UserDetails> checkUserDetails(List<UserDetails> list, UserDetails userDetails){
        Optional<UserDetails> res = Optional.empty();
        for(UserDetails e : list){
            if(doubleStringChecker(e.getName(), e.getValue(), userDetails.getName(), userDetails.getValue())){
                return res = Optional.of(e);
            }
        }
        return res;
    }


    private boolean doubleStringChecker(String strA1, String strA2, String strB1, String strB2) {
        return strA1.equalsIgnoreCase(strB1) && strA2.equalsIgnoreCase(strB2);
    }
}
