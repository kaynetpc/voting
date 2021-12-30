package com.kaynetpc.voting.role.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kaynetpc.voting.model.Role;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.UserRoles;
import com.kaynetpc.voting.model.UserTypes;
import com.kaynetpc.voting.role.dao.RepoRole;
import com.kaynetpc.voting.role.dao.RepoUserRoles;
import com.kaynetpc.voting.user.dao.RepoUser;
import com.kaynetpc.voting.user.dao.RepoUserTypes;
import com.kaynetpc.voting.utils.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    
    @Autowired RepoRole repoRole;
    @Autowired RepoUser repoUser;
    @Autowired RepoUserRoles repoUserRoles;
    @Autowired RepoUserTypes repoUserTypes;

    public String initializeRoles(List<Role> entities){
        List<Role> pro = new ArrayList<>();
        List<Role> list = new ArrayList<>();
        for(Role each : entities){
            if(!isRoleExist(list, each).isPresent()){
                pro.add(each);
            }
        }
        try {
            repoRole.saveAll(pro);
            return new Messages().saveMSG();
        } catch (Exception e) {
            e.printStackTrace();
            return new Messages().errorMSG();
        }
    }

    public String assignRole(RoleCostumeRequest rcr){
        List<Role> roleListAll = repoRole.findAll();

        List<Integer> rolesIds = convertStringListToInt(rcr.getRolesId());

        List<Role> roleList = getRolesByIds(roleListAll, rolesIds);

        String type = rcr.getType();
        
        List<UserRoles> urList = repoUserRoles.findAll();

        System.out.println("L______________________LLL       "+roleList.size());

        Optional<UserTypes> userTypes = repoUserTypes.findByName(type);
        
        if(userTypes.isPresent()){
            Optional<UserRoles> us_r = isUserRolesExist(urList, type);
            if(!us_r.isPresent()){
                repoUserRoles.save(new UserRoles(type, roleList));
                return "Saved!";
            } else {
                us_r.get().setRoles(roleList);
                repoUserRoles.save(us_r.get());
                return "Updated!";
            }
        } else {
            return "Type Not found!";
        }
    }

    List<Role> getRolesByIds(List<Role> list, List<Integer> ids){
        List<Role> role = new ArrayList<>();
        for(Role e: list){
            if(inCludeInIntegers(ids, e.getId())){
                role.add(e);
            }
        }
        return role;
    }

    boolean inCludeInIntegers(List<Integer> list, int num){
        boolean res = false;
        for(Integer e : list){
            if(e == num){
                return res = true;
            }
        }
        return res;
    }
    public List<Role> getRoleList(){
        return repoRole.findAll();
    }

    Optional<Role> isRoleExist(List<Role> list, Role role){
        Optional<Role> res = Optional.empty();
        for(Role e: list){
            if(e.getName().equalsIgnoreCase(role.getName()) || e.getId() == role.getId()){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<UserRoles> isUserRolesExist(List<UserRoles> list, String type){
        Optional<UserRoles> res = Optional.empty();
        for(UserRoles e: list){
            if(e.getType().equalsIgnoreCase(type)){
                return res = Optional.of(e);
            }
        }
        return res;
    }



    /**Convert list of String to list of integer */
    List<Integer> convertStringListToInt(List<String> list){
        List<Integer> intList = new ArrayList<>();
        for(String s : list){
            intList.add(Integer.parseInt(s));
        }
        return intList;
    }


}
