import { ContestForm } from "../../contestant/ContestForm";
import { ContestantList } from '../../contestant/ContestantList';
import CreatElection from "../../activities/election/CreatElection";
import { CreatePosts } from '../../activities/election/CreatePosts';
import { Profile } from "../../activities/profile/Profile";


const SubLinks = [
    {id: 1, name: "Register As Contestant", value: <ContestForm /> },
    {id: 2, name: "View All Contestant", value: <ContestantList />},
    {id: 3, name: "Profile", value: <Profile /> },
    {id: 4, name: "Create Election Level", value: <CreatElection />},
    {id: 5, name: "Create Posts", value: <CreatePosts />}
];
export default SubLinks;



