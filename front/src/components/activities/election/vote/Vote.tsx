import { LabelView } from '../../../../dependencies/label/LabelView'
import './Vote.css';
import { KNT } from '../../../../dependencies/js/knt';
import { baseUrl, MSG } from '../../../service/Constant';
import { JHttp } from '../../../../dependencies/js/Jpc';



interface Props {
    userId: string;
    candidateInfo?: {
        name: "",
        firstName: "",
        lastName: "",
        gender: "",
        level: "",
        title: "",
        image: "",
        post: {
            name: "", title: "", aim: "", objective: "", id: null
        },
        userId: "",
        aim: "", 
        objective: "",
    } | any;
}

export const Vote = ({candidateInfo, userId}: Props) => {


    const voteNow = () => {
        const con = (msg: string): boolean => {return window.confirm(msg)};
        if(candidateInfo){
            const data = {
                candidateId: candidateInfo.userId,
                postId: candidateInfo.post.id,
                userId: userId,
                electionName: candidateInfo.name
            };
            if(con(MSG.vote(candidateInfo.lastName))){
                console.log(data);
                KNT.validateField.validate([data], (field: string) => alert(MSG.fieldRequiredMSG(field)), () => {
                    JHttp.post(`${baseUrl}/vote/v`, data, (res: string) => alert(res), (err: any) => console.log(err) );
                });
            }

            
        }
        
    }
    

    return (
        <div className="vote-pane">
            <div className='vote-label'>info</div>
        {
            candidateInfo && 
            
            <div className='vote-frame'>
                <div className='vote-frame-info'>
                    <h3>Basic Info About {candidateInfo.lastName} </h3>
                    <LabelView label={"Title"} value={candidateInfo.title} />
                    <LabelView label={"Name"} value={candidateInfo.lastName+" "+candidateInfo.firstName} />
                    <LabelView label={"Gender"} value={candidateInfo.gender} />
                    <LabelView label={"Aim"} value={candidateInfo.aim} />
                    <LabelView label={"Objective"} value={candidateInfo.objective} />

                </div>
                <div className='vote-frame-vote'>
                    <div onClick={voteNow} >
                        <div>
                            <span>VOTE NOW</span>
                            <span>CLICK HERE {"✔️"}</span>
                        </div>
                    </div>
                </div>
                <div className='vote-frame-image' ><img src={"/image/UserProfile.png"} alt='user-image' /></div>
            </div>
            }
        </div>
    )
}






