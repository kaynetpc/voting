import { ContestForm } from "../../contestant/ContestForm";
import { ContestantList } from '../../contestant/ContestantList';
import CreateElectionLevel from "../../activities/election/CreateElectionLevel";
import { CreatePosts } from '../../activities/election/CreatePosts';
import { Profile } from "../../activities/profile/Profile";
import CreatElection from "../../activities/election/CreatElection";
import VotingList from "../../activities/election/vote/VotingList";
import CreateRole from "../../admin/CreateRole";
import AssignRole from "../../admin/AssignRole";
import { User } from '../../user/User';


const SubLinks = [
    {id: 1, name: "Register As Contestant", value: <ContestForm /> },
    {id: 2, name: "View All Contestant", value: <ContestantList />},
    {id: 3, name: "Profile", value: <Profile /> },
    {id: 4, name: "Create Election Level", value: <CreateElectionLevel />},
    {id: 5, name: "Create Posts", value: <CreatePosts />},
    {id: 6, name: "Election Form", value: <CreatElection target="form" />},
    {id: 7, name: "Election List", value: <CreatElection />},
    {id: 8, name: "Voting List", value: <VotingList />},
    {id: 9, name: "Roles List", value: <CreateRole />},
    {id: 10, name: "Role Assign", value: <AssignRole />},
    {id: 11, name: "All User", value: <User />},
    {id: 13, name: "No role Found", value: <div className="container">No role yet</div>},
];
export default SubLinks;



