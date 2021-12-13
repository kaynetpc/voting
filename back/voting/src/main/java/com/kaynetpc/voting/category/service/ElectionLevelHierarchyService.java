package com.kaynetpc.voting.category.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kaynetpc.voting.category.dao.RepoPosts;
import com.kaynetpc.voting.category.dao.RepoPostHierarchy;
import com.kaynetpc.voting.category.dao.RepoPostNames;
import com.kaynetpc.voting.model.Posts;
import com.kaynetpc.voting.model.ElectionLevelHierarchy;
import com.kaynetpc.voting.model.PostNames;
import com.kaynetpc.voting.utils.Helper;
import com.kaynetpc.voting.utils.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ElectionLevelHierarchyService {


    @Autowired RepoPosts repoPosts;
    @Autowired RepoPostHierarchy repoPostHierarchy;
    @Autowired RepoPostNames repoPostNames;


    Messages MSG  = new Messages();

    Helper help = new Helper();

    String todaysDate = help.getTodaysDate();


    /**Create Election Hierarchy */
    public String createElectionHierarchy(List<ElectionLevelHierarchy> entities){

        /**Check if post name exist */
        List<PostNames> postNames = repoPostNames.findAll();

        List<ElectionLevelHierarchy> list = repoPostHierarchy.findAll();

        List<ElectionLevelHierarchy> process = new ArrayList<>();

        List<Posts> posts = new ArrayList<>();

        for(ElectionLevelHierarchy each : entities){
            Optional<ElectionLevelHierarchy> checker = checkElectionHierarchyExist(list, each);
            if(checker.isPresent()){
                each.setId(checker.get().getId());

                List<Posts> existingPosts = checker.get().getPosts();
                each.getPosts().forEach(post -> {
                    if(!checkPostExist(posts, post).isPresent()){
                        existingPosts.add(post);
                        posts.add(post);                        
                    }
                });
                
                each.setPosts(posts);
                
                process.add(each);
            } else {
                List<Posts> postList = new ArrayList<>();
                if(each.getPosts() != null) each.getPosts().forEach(post -> {
                    if(!checkPostExist(posts, post).isPresent()){
                        posts.add(post);    
                        postList.add(post);
                    }
                });

                each.setPosts(postList);
                process.add(each);
            }
        }

        try {

            repoPosts.saveAll(posts);

            repoPostHierarchy.saveAll(process);

            addPostNamesFromPostList(postNames, posts);/**Update Post names with new ones if present */

            return MSG.saveMSG(); 

        } catch (Exception e) {
            e.printStackTrace();
            return MSG.errorMSG();            
        }
    }

    /**Create Election Posts */
    public String createElectionPosts(List<ElectionPostRequest> entities){

        /**Check if post name exist */
        List<PostNames> postNames = repoPostNames.findAll();

        List<ElectionLevelHierarchy> list = repoPostHierarchy.findAll();

        List<ElectionLevelHierarchy> process = new ArrayList<>();

        List<Posts> posts = new ArrayList<>();

        for(ElectionPostRequest each : entities){
            Optional<ElectionLevelHierarchy> checker = checkElectionHierarchyExistByName(list, each.getLevel());
            if(checker.isPresent()){
                ElectionLevelHierarchy electPost = checker.get();


                List<Posts> existingPosts = checker.get().getPosts();

                

                each.getPosts().forEach(post -> {
                    if(!checkPostExist(posts, post).isPresent()){
                        existingPosts.add(post);
                        posts.add(post);                        
                    }
                });
                
                electPost.setPosts(posts);
                
                process.add(electPost);
            }
        }

        try {

            repoPosts.saveAll(posts);

            repoPostHierarchy.saveAll(process);

            addPostNamesFromPostList(postNames, posts);/**Update Post names with new ones if present */

            return MSG.saveMSG(); 

        } catch (Exception e) {
            e.printStackTrace();
            return MSG.errorMSG();            
        }
    }



    public String addPostNamesFromPostList(List<PostNames> listName, List<Posts> posts){
        List<PostNames> res = new ArrayList<>();

        posts.forEach(post -> {
            if(!checkPostNamesExist(listName, post.getName()).isPresent()){
                res.add(new PostNames(post.getName(), new Helper().getTodaysDate()));
            }
        });

        repoPostNames.saveAll(res);
        return "OH";
    }


    public String createPostNames(List<PostNames> listName){

        List<PostNames> list = repoPostNames.findAll();

        List<PostNames> pr = new ArrayList<>();

        for(PostNames e: listName){
            if(!checkPostNamesExist(list, e.getName()).isPresent()){
                e.setDateCreated(todaysDate);
                pr.add(e);
            }
        }

        repoPostNames.saveAll(pr);
        return "OH";
    }



    public List<ElectionLevelHierarchy> getPostHierarchy(){
        return repoPostHierarchy.findAll();
    }

    public List<PostNames> getPostNames(){
        return repoPostNames.findAll();
    }







    Optional<ElectionLevelHierarchy> checkElectionHierarchyExistByName(List<ElectionLevelHierarchy> list, String name) {
        Optional<ElectionLevelHierarchy> res = Optional.empty();
        for(ElectionLevelHierarchy e: list){
            if(e.getName().equalsIgnoreCase(name)){
                return res = Optional.of(e);
            }
        }
        return res;
    }


    Optional<ElectionLevelHierarchy> checkElectionHierarchyExist(List<ElectionLevelHierarchy> list, ElectionLevelHierarchy cat) {
        Optional<ElectionLevelHierarchy> res = Optional.empty();
        for(ElectionLevelHierarchy e: list){
            if(e.getName().equalsIgnoreCase(cat.getName())){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<PostNames> checkPostNamesExist(List<PostNames> list, String name) {
        Optional<PostNames> res = Optional.empty();
        for(PostNames e: list){
            if(e.getName().equalsIgnoreCase(name)){
                return res = Optional.of(e);
            }
        }
        return res;
    }


    Optional<Posts> checkPostExist(List<Posts> list, Posts cat) {
        Optional<Posts> res = Optional.empty();
        for(Posts e: list){
            if(e.getName().equalsIgnoreCase(cat.getName())){
                return res = Optional.of(e);
            }
        }
        return res;
    }


    /**Create  */


}
