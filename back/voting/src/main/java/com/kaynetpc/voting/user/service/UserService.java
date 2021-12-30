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
import com.kaynetpc.voting.model.UserRoles;
import com.kaynetpc.voting.model.UserTypes;
import com.kaynetpc.voting.role.dao.RepoUserRoles;
import com.kaynetpc.voting.user.dao.RepoUser;
import com.kaynetpc.voting.user.dao.RepoUserDetails;
import com.kaynetpc.voting.user.dao.RepoUserTypes;
import com.kaynetpc.voting.utils.Constant;
import com.kaynetpc.voting.utils.Helper;
import com.kaynetpc.voting.utils.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired RepoUser repoUser;
    @Autowired RepoUserDetails repoUserDetails;
    @Autowired RepoUserRoles repoUserRoles;
    @Autowired RepoUserTypes repoUserTypes;

    @Autowired LoginService loginService;


    Messages MSG = new Messages();
    Helper help = new Helper();
    Constant constant = new Constant();

    public LoginResponse createNewUser(User entity){
        List<User> list = repoUser.findAll();
        List<UserRoles> userRoles = repoUserRoles.findAll();
        
        
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
            return new LoginResponse(new User(), "date", help.failed, MSG.userAlreadyExist(), userRoles);
            
        }
        

    }


    public Object getUserProfile(String userId){
        Optional<User> user = repoUser.findByUserId(userId);
        if(user.isPresent()){
            return new UserProfile(user.get());
        } else if(userId.equalsIgnoreCase(constant.sysUsername())) {
            User user2 = new User();
            user2.setLastName(constant.sysAdminLastName());
            user2.setFirstName(constant.sysAdminFirstName());
            return new UserProfile(user2);
        } else return MSG.invalidCredential(); 
    }


    public List<UserResponse> getUsersList(){
        List<UserResponse> res = new ArrayList<>();
        List<User> allUser = repoUser.findAll();
        for(User e: allUser){
            res.add(new UserResponse(e));
        }
        return res;
    }


    public String createUserTypes(List<UserTypes> entities){
        List<UserTypes> process = new ArrayList<>();
        for(UserTypes each: entities){
            Optional<UserTypes> isExist = repoUserTypes.findByName(each.getName());
            if(!isExist.isPresent()){
                process.add(each);
            }
        }
        try {
            repoUserTypes.saveAll(process);
            return MSG.saveMSG();
        } catch (Exception e) {
            e.printStackTrace();
            return MSG.errorMSG();
        }
    }

    public List<UserTypes> getUserTypes(){
        return repoUserTypes.findAll();
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
