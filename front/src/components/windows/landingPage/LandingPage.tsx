import { ReactNode, useEffect } from 'react'
import { FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { KNT } from '../../../dependencies/js/knt';
import { basic } from '../../core/configuration/config';
import { UserData } from '../../service/Constant';
import { IReducersState } from '../../service/Reducers';

import './LandingPage.css'
interface Props {
    page: ReactNode,
    title?: string,
}

export const LandingPage = (props: Props) => {
    const user = UserData();
    const title: string = useSelector<IReducersState>(state => state.title) as string;

    const username = sessionStorage.getItem("username");
  
    
    
    // if(username === null || username === undefined){navigate("/")}
    return (
        <div className="page-frame">
            <div className="header">
            <div className='header-logo'>
                {basic.appLogo}
            </div>
            <div className='header-label'>
                <h3>{KNT.string.titleCase(title)}</h3>
            </div>
            <div className='header-menu'>
                {username && <span><FiUser/> {username}</span>}
            </div>
            </div>            
            <div className="contents">
                {props.page}
            </div>            
            <div className="footer"><i>(c) {basic.company} 2021 in collaboration with <small> {basic.developer}</small> </i></div>           
        </div>
    )
}
