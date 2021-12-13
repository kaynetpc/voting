import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { KNT } from '../../../dependencies/js/knt';
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
    
    useEffect(() => {
        console.log(user)
        console.log(localStorage.getItem("user_basic_data"));
        return;
    }, [user]);
    
    
    // if(username === null || username === undefined){navigate("/")}
    return (
        <div className="page-frame">
            <div className="header">
                <h3>{KNT.string.titleCase(title)}</h3>
                <span>{username}</span>
            </div>            
            <div className="contents">
                {props.page}
            </div>            
            <div className="footer"><i>(c) kaynetpc 2021</i></div>           
        </div>
    )
}
