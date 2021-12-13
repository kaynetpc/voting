import { useState } from "react"
import { useSelector } from "react-redux"
import Table from "../../dependencies/table/Table"
import { UIWindow } from "../../dependencies/views/Views"
import { Vote } from "../activities/election/vote/Vote"
import { baseUrl } from "../service/Constant"
import { IReducersState, IUserData } from "../service/Reducers"

interface Props {
    
}

export const ContestantList = (props: Props) => {

    const user: IUserData = useSelector<IReducersState>(state => state.userData) as IUserData;

    const [show, setShow] = useState(false);

    const [candidateIfo, setCandidateInfo] = useState({})



    const actionOptions = () => {
        return [
            {value: "vote", title: "Click to vote", label: "Vote Candidate"}
        ]
    }
    

    const handleActionOptionClick = (val: string, data: any) => {
        console.log(val, data);
        if(val === "vote"){
            setShow(true)
            setCandidateInfo(data)
        }
    }
    return (
        <div className="container">
            <Table http={{url: `${baseUrl}/election/get/contestant`, type: "GET" }} onActionOptions={actionOptions()} onActionOptionClick={handleActionOptionClick} />
            <UIWindow onShow={show} onClosed={() => setShow(false)} title="Vote Contestant" >
                <Vote userId={user.username} candidateInfo={candidateIfo} />
            </UIWindow>
        </div>
    )
}
