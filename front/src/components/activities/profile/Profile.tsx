import React from 'react'
import { useSelector } from 'react-redux';
import { IReducersState, IUserData } from '../../service/Reducers';
import ProfileUpdate from './ProfileUpdate'

interface Props {
    
}

export const Profile = (props: Props) => {

    
    const user: IUserData = useSelector<IReducersState>(state => state.userData) as IUserData;


    return (
        <div className='container'>
            <ProfileUpdate userId={user.username}/>
        </div>
    )
}
