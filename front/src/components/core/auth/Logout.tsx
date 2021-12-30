import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MSG } from '../../service/Constant';
import {RiLogoutCircleRLine} from 'react-icons/ri'

interface Props {
    
}

export const Logout = (props: Props) => {
    let navigate  = useNavigate();

    const logoutFunc = () => {
        if(window.confirm(MSG.confirmLogoutMSG)){
            sessionStorage.clear();
            localStorage.clear()
            navigate('/');
        }
    }

    return (
            <RiLogoutCircleRLine title='logout' onClick={logoutFunc}  />
    )
}
