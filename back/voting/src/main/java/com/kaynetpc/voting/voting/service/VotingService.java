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
            if(!isVotingExist(list, each.getCandidateId()).isPresent()){
                each.getVotes().forEach(vt -> {
                    if(!isVotesExist(previousVotes, vt).isPresent()){
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


    public String makeVote(VoteRequest voteRequest){

        Optional<User> user = repoUser.findByUserId(voteRequest.getUserId());
        Optional<Posts> post = repoPosts.findById(voteRequest.getPostId());
        
        List<Votes> allVotes = repoVotes.findAll();

        Optional<Voting> voting = repoVoting.findByCandidateIdAndElectionName(voteRequest.getCandidateId(), voteRequest.getElectionName());


        if(voting.isPresent() && user.isPresent() && post.isPresent()){

            /**Election */
            /**is election active */
            Optional<Election> election = repoElection.findByName(voteRequest.getElectionName());

            

            if(election.isPresent() && election.get().getActive() && help.isDateWithing(election.get().getStartDate(), election.get().getEndDate(), help.getTodaysDate())){
                
                            /**Construct vote */
                            Votes vote = new Votes(user.get().getUserId(), voting.get().getCandidateId(), voting.get().getElectionName());
                
                            /**Update Vote record */
                            List<Votes> previousVote = voting.get().getVotes();
                            /**Check if user already vote */
                            if(!isVotesExist(allVotes, vote).isPresent()){
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




    /**Get Voting List */
    public VotingResponseView getVotingList(String electionName){
        List<Voting> voting = repoVoting.findByElectionName(electionName);
        long totalVotes = 0;
        for(Voting e : voting){
            totalVotes += e.getVotes().size();
        }
        return new VotingResponseView(voting, voting.size(), totalVotes);
    }

    /**Get Voting Full Details */
    public List<CostumeVoting> getVotingListDetail(String electionName){
        List<CostumeVoting> res = new ArrayList<>();

        List<Voting> voting = repoVoting.findByElectionName(electionName);
        List<User> users = repoUser.findAll();
        List<Election> electionList = repoElection.findAll();

        for(Voting each : voting){
            User user = getUserByUserId(users, each.getCandidateId()).get();
            long totalVote = each.getVotes().size();
            Election electionType = getElectionTypeByName(electionList, each.getElectionName()).get();
            

            res.add(new CostumeVoting(user, each.getPost(), electionType, totalVote, each.getVotes()));

        }
        
        return res;
    }











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

    Optional<Votes> isVotesExist(List<Votes> list, Votes vote){
        Optional<Votes> res = Optional.empty();
        for(Votes e: list){
            if(e.getVotersId().equalsIgnoreCase(vote.getVotersId()) && e.getElectionName().equalsIgnoreCase(vote.getElectionName())){
                return res = Optional.of(e);
            }
        }
        return res;
    }

    Optional<Voting> isVotingExist(List<Voting> list, String candidateId){
        Optional<Voting> res = Optional.empty();
        for(Voting e: list){
            if(e.getCandidateId().equalsIgnoreCase(candidateId)){
                return res = Optional.of(e);
            }
        }
        return res;
    }
}
