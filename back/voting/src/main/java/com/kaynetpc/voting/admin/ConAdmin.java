package com.kaynetpc.voting.admin;

import com.kaynetpc.voting.login.service.LoginResponse;
import com.kaynetpc.voting.utils.Constant;
import com.kaynetpc.voting.utils.Helper;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "/admin")
public class ConAdmin {

    Constant constant = new Constant();
    Helper help = new Helper();
    
    @GetMapping(value = "/get/details")
    public LoginResponse getAminInfo(){
        LoginResponse res = new LoginResponse();
       res.setUsername(constant.sysUsername());
       res.setFirstName(constant.sysAdminFirstName());
       res.setLastName(constant.sysAdminLastName());
       res.setStatus(help.connected);
        return res;
    }
}
