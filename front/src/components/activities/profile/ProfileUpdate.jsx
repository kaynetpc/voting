import  { useEffect, useState } from 'react'
import { JHttp } from '../../../dependencies/js/Jpc';
import { KNT } from '../../../dependencies/js/knt';
import { LabelView } from '../../../dependencies/label/LabelView';
import { baseUrl } from '../../service/Constant';

function ProfileUpdate({userId}) {
    const [state, setState] = useState({});

    

    useEffect(() => {
        console.log("object ",userId);
        JHttp.get(`${baseUrl}/user/profile?userId=${userId}`, (data) => {
            if(data !== null && typeof data !== String){
                setState(data);
            }
        }, (e) => console.log(e))
    }, [])

    return (
        <div className='container'>
            {
                KNT.array.buildObjToNameAndValue([state]).map((x, i) => (
                    <LabelView label={KNT.string.titleCase(x.name)} value={x.value} key={i} />
                ))
            }
        </div>
    )
}

export default ProfileUpdate
