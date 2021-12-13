package com.kaynetpc.voting.election.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kaynetpc.voting.category.dao.RepoPosts;
import com.kaynetpc.voting.description.dao.RepoDescription;
import com.kaynetpc.voting.election.dao.RepoContestant;
import com.kaynetpc.voting.election.dao.RepoElection;
import com.kaynetpc.voting.model.Contestants;
import com.kaynetpc.voting.model.Description;
import com.kaynetpc.voting.model.Election;
import com.kaynetpc.voting.model.Posts;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.user.dao.RepoUser;
import com.kaynetpc.voting.utils.Constant;
import com.kaynetpc.voting.utils.Helper;
import com.kaynetpc.voting.utils.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContestantService {
    @Autowired RepoUser repoUser;
    @Autowired RepoContestant repoContestant;
    @Autowired RepoDescription repoDescription;
    @Autowired RepoPosts repoPosts;
    @Autowired RepoElection repoElection;

    Messages MSG =  new Messages();
    Helper help = new Helper();
    Constant constant = new Constant();

    /**Add New Contestant */
    public String addContestant(List<Contestants> entities) {
        List<Contestants> process = new ArrayList<>();
        List<Description> desc = new ArrayList<>();
        List<User> users = repoUser.findAll();

        List<Contestants> list = repoContestant.findAll();
        List<Posts> posts = repoPosts.findAll();

        for(Contestants each : entities){
            /**Check id submission exist */
            Optional<Contestants> isExist = checkContestant(list, each);
            if(!isExist.isPresent()){
                List<Description> des = new ArrayList<>();
                User user = getUserByUserId(users, each.getUserId()).get();

                if(each.getDescriptions() != null) each.getDescriptions().forEach(de -> {
                    des.add(de);
                    desc.add(de);
                });

                each.setImage(user.getImage());
                each.setTitle(user.getTitle());
                /**Set date of submission */
                each.setDate(help.getTodaysDate());
                /**handle posts */
                Posts post = getPostById(posts, each.getPostId()).get();
                each.setPost(post);
                
                each.setDescriptions(des);
                process.add(each);
            }

        }

        
        try {
            repoContestant.saveAll(process);
            repoDescription.saveAll(desc);
            return MSG.saveMSG();
        } catch (Exception e) {
            e.printStackTrace();
            return MSG.errorMSG();
        }
        
    }
    /**get New Contestant */
    /**Remove or ban Contestant */



    public List<Contestants> getContestantList(){
        List<Contestants> res = repoContestant.findAll();
        return res;
    }


    public String addElection(List<Election> entities){
        List<Election> list = repoElection.findAll();
        List<Election> process = new ArrayList<>();

        for(Election each : entities){
            if(!isElectionExist(list, each).isPresent()){
                each.setDateCreated(help.getTodaysDate());
                process.add(each);
            }
        }

        try {
            repoElection.saveAll(process);
            return MSG.saveMSG();
            
        } catch (Exception e) {
            e.printStackTrace();
            return MSG.errorMSG();
        }

    }



    Optional<Election> isElectionExist(List<Election> list, Election election ) {
        Optional<Election> res = Optional.empty();
        for(Election e : list){
            if(e.getName().equalsIgnoreCase(election.getName())){
                return res = Optional.of(e);
            }
        }
        return res;
    }



    Optional<Contestants> checkContestant(List<Contestants> list, Contestants contestant ) {
        Optional<Contestants> res = Optional.empty();
        for(Contestants e : list){
            if(e.getUserId().equalsIgnoreCase(contestant.getUserId()) && e.getPostId() == contestant.getPost().getId() && e.getLevel().equalsIgnoreCase(contestant.getLevel())){
                return res = Optional.of(e);
            }
        }
        return res;
    }


    Optional<User> getUserByUserId(List<User> list, String userId ) {
        Optional<User> res = Optional.empty();
        for(User e : list){
            if(e.getUserId().equalsIgnoreCase(userId)){
                return res = Optional.of(e);
            }
        }
        return res;
    }



    Optional<Posts> getPostById(List<Posts> list, long id) {
        Optional<Posts> res = Optional.empty();
        for(Posts e : list){
            if(e.getId() == id){
                return res = Optional.of(e);
            }
        }
        return res;
    }
}
