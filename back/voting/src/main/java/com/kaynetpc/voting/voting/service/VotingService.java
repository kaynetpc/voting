package com.kaynetpc.voting.voting.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.kaynetpc.voting.category.dao.RepoPosts;
import com.kaynetpc.voting.election.dao.RepoElection;
import com.kaynetpc.voting.model.Election;
import com.kaynetpc.voting.model.Posts;
import com.kaynetpc.voting.model.User;
import com.kaynetpc.voting.model.Votes;
import com.kaynetpc.voting.model.Voting;
import com.kaynetpc.voting.user.dao.RepoUser;
import com.kaynetpc.voting.utils.Helper;
import com.kaynetpc.voting.utils.Messages;
import com.kaynetpc.voting.voting.dao.RepoVotes;
import com.kaynetpc.voting.voting.dao.RepoVoting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VotingService {
    
    @Autowired RepoVoting repoVoting;
    @Autowired RepoVotes repoVotes;
    @Autowired RepoUser repoUser;
    @Autowired RepoPosts repoPosts;
    @Autowired RepoElection repoElection;

    Helper help = new Helper();


    public String addCandidate(List<Voting> entities){
        List<Voting> process = new ArrayList<>();
        List<Voting> list = repoVoting.findAll();
        List<Votes> previousVotes = repoVotes.findAll();
        List<Votes> votes = new ArrayList<>();
        for(Voting each  : entities){
            List<Votes> votesBox = new ArrayList<>();
            if(!isVotingExist(list, each.getCandidateId(), each.getElectionName()).isPresent()){
                each.getVotes().forEach(vt -> {
                    if(!isVotesExist(previousVotes, vt.getVotersId(), vt.getCandidateId(), vt.getElectionName()).isPresent()){
                        votesBox.add(vt);
                        votes.add(vt);
                    }
                });
    
                each.setVotes(votesBox);
            }

        }

        try {
            repoVotes.saveAll(votes);
            repoVoting.saveAll(process);
            return new Messages().saveMSG();
        } catch (Exception e) {
            e.printStackTrace();
            return new Messages().errorMSG();
        }
    
    
    }


    /** */
    public String makeVoteBBBB(VoteRequest voteRequest){

        Optional<User> user = repoUser.findByUserId(voteRequest.getUserId());
        Optional<Posts> post = repoPosts.findById(voteRequest.getPostId());
        
        List<Votes> allVotes = repoVotes.findAll();

        Optional<Voting> voting = repoVoting.findByCandidateIdAndElectionName(voteRequest.getCandidateId(), voteRequest.getElectionName());


        if(voting.isPresent() && user.isPresent() && post.isPresent()){

            /**Election */
            /**is election active */
            Optional<Election> election = repoElection.findByName(voteRequest.getElectionName());

            // help.isDateWithing(election.get().getStartDate(), election.get().getEndDate(), help.getTodaysDate())

            if(election.isPresent() && election.get().getActive()){
                
                            /**Construct vote */
                            Votes vote = new Votes(user.get().getUserId(), voting.get().getCandidateId(), voting.get().getElectionName());
                
                            /**Update Vote record */
                            List<Votes> previousVote = voting.get().getVotes();
                            /**Check if user already vote */
                            if(!isVotesExist(allVotes, voteRequest.getUserId(), voteRequest.getCandidateId(), voteRequest.getElectionName()).isPresent()){
                                /**append vote for candidate */
                                previousVote.add(vote);
                            }
                
                            /**Update Back posts */
                            voting.get().setVotes(previousVote);
                            
                            try {
                                /**Save vote */
                                repoVotes.save(vote);
                                /**Save voting record */
                                repoVoting.save(voting.get());
                
                                return new Messages().voteSubmitMSG();
                                
                            } catch (Exception e) {
                                e.printStackTrace();
                                return new Messages().errorMSG();
                            }
            } else {
                return new Messages().electionExpiredOrNotPresent();
            }
        } else {
            return "Cant Find Contestant Selected";
        }
    }


    public String makeVote(VoteRequest voteRequest){
        
        // Optional<User> user = repoUser.findByUserId(voteRequest.getUserId());
        // Optional<User> candidate = repoUser.findByUserId(voteRequest.getCandidateId());
        // Optional<Posts> post = repoPosts.findById(voteRequest.getPostId());

        List<Votes> allVotes = repoVotes.findAll();
        List<Votes> newVotes = new ArrayList<>();

        List<Voting> allVoting = repoVoting.findAll();
        List<Voting> newVoting = new ArrayList<>();


        Optional<Election> election = repoElection.findByName(voteRequest.getElectionName());

        if(election.isPresent() ){
            /**check if exist */
            Optional<Voting> voting = isVotingExist(allVoting, voteRequest.getCandidateId(), voteRequest.getElectionName());
            if(!voting.isPresent()){
                List<Votes> blank_votes = new ArrayList<>();
    
                /**Check if exist */
                Votes votes = new Votes(voteRequest.getUserId(), voteRequest.getCandidateId(), voteRequest.getElectionName());
                if(!isVotesExist(allVotes, voteRequest.getUserId(), voteRequest.getCandidateId(), voteRequest.getElectionName()).isPresent()){
                    blank_votes.add(votes);
                    newVotes.add(votes);
                }
    
                Voting voting2 = new Voting(voteRequest.getCandidateId(), voteRequest.getPostId(), voteRequest.getElectionName(), blank_votes);
                newVoting.add(voting2);
    
            } else {
    
                List<Votes> blank_votes = voting.get().getVotes();
                /**Check if exist */
                Votes votes = new Votes(voteRequest.getUserId(), voteRequest.getCandidateId(), voteRequest.getElectionName());

                if(!isVotesExist(allVotes, voteRequest.getUserId(), voteRequest.getCandidateId(), voteRequest.getElectionName()).isPresent()){
                    blank_votes.add(votes);
                    newVotes.add(votes);
                }
                voting.get().setVotes(blank_votes);
                newVoting.add(voting.get());
            }


            
            try {
                repoVotes.saveAll(newVotes);
                repoVoting.saveAll(newVoting);
                return "Saved";
            } catch (Exception e) {
                e.printStackTrace();
                return "Failed!";
            }
        }
        System.out.print("______________GOT HERE 3__________________________________******");

        return "Election not found";

    }


    /**Get Voting List */
    public List<VotingResponseView> getVotingList(){
        List<Voting> voting = repoVoting.findAll();
        List<VotingResponseView> res = new ArrayList<>();
        List<User> users = repoUser.findAll();
        List<Posts> posts = repoPosts.findAll();
        

        for(Voting e : voting){
            User user = getUserByUserId(users, e.getCandidateId()).get();
            long postId = e.getPostId();
            Posts post = getPostById(posts, postId).get();
            VotingResponseView voteView = new VotingResponseView(e, post.getName(), user);
            res.add(voteView);
        }
        return res;
    }

    /**Get Voting Full Details */
    // public List<CostumeVoting> getVotingListDetail(String electionName){
    //     List<CostumeVoting> res = new ArrayList<>();

    //     List<Voting> voting = repoVoting.findByElectionName(electionName);
    //     List<User> users = repoUser.findAll();
    //     List<Election> electionList = repoElection.findAll();

    //     for(Voting each : voting){
    //         User user = getUserByUserId(users, each.getCandidateId()).get();
    //         long totalVote = each.getVotes().size();
    //         Election electionType = getElectionTypeByName(electionList, each.getElectionName()).get();
            

    //         res.add(new CostumeVoting(user, each.getPostId(), electionType, totalVote, each.getVotes()));

    //     }
        
    //     return res;
    // }











    /**Custom Repositories */
    Optional<Election> getElectionTypeByName(List<Election> list,String name){
        Optional<Election> res = Optional.empty();
        for(Election e : list){
            if(e.getName().equalsIgnoreCase(name)){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<User> getUserByUserId(List<User> list,String userId){
        Optional<User> res = Optional.empty();
        for(User e : list){
            if(e.getUserId().equalsIgnoreCase(userId)){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<Posts> getPostById(List<Posts> list,long postId){
        Optional<Posts> res = Optional.empty();
        for(Posts e : list){
            if(e.getId() == postId){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<Votes> isVotesExist(List<Votes> list, String votersId, String candidateId, String electionName){
        Optional<Votes> res = Optional.empty();
        for(Votes e: list){
            if(e.getVotersId().equalsIgnoreCase(votersId) && e.getCandidateId().equalsIgnoreCase(candidateId) && e.getElectionName().equalsIgnoreCase(electionName)){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<Voting> isVotingExist(List<Voting> list, String candidateId, String electionName){
        Optional<Voting> res = Optional.empty();
        for(Voting e: list){
            if(e.getCandidateId().equalsIgnoreCase(candidateId) && e.getElectionName().equalsIgnoreCase(electionName)){
                return res = Optional.of(e);
            }
        }
        return res;
    }
}
