import { ReactNode, useEffect, useState } from 'react'
import { FiUser } from 'react-icons/fi';
import { connect, useDispatch } from 'react-redux';
import { KNT } from '../../../dependencies/js/knt';
import { Switcher } from '../../../dependencies/switcher/Switcher';
import { Logout } from '../../core/auth/Logout';
import { basic, basicJSX } from '../../core/configuration/config';
import { adminBasic, userBasicRoles } from '../../service/Constant';
// import { UserData } from '../../service/Constant.tsx';
import { IReducersState, mapStateToProp } from '../../service/Reducers';
import SubLinks from '../SubLinks/SubLinks';

import './SkinPage.css';
interface Props extends IReducersState {
    page?: ReactNode,
}

const SkinPage = ({userData, page}: Props) => {
    // const user = UserData();
    // const title: string = useSelector<IReducersState>(state => state.title) as string;
    // const user: IUserData = useSelector<IReducersState>(state => state.userData) as IUserData;

    const username = sessionStorage.getItem("username");
    const dispatcher = useDispatch();

    const [header, setHeader] = useState("");
    const [view, setView] = useState("");



    const store = sessionStorage.getItem("user_basic_data");

    
    useEffect(() => {
        store && dispatcher({type: "setUserData", data: JSON.parse(store)});
    }, []);
        
    // if(username === null || username === undefined){navigate("/")}
    const rolesIds = () => {
        console.log(userData.username, adminBasic);
        if(userData.username === adminBasic.username){
            return adminBasic.roles;
        } else if(userData.rolesId.length > 0 && userData.rolesId !== undefined && userData !== null){
            return userData.rolesId;
        } else {
            return [13]
        }
    }

    const subLi = KNT.array.extractByKeyValues(SubLinks, "id", rolesIds());
    const handleControl = (text: string) => {
        setHeader(text);
    }
    return (
        <div className="skin-home">
            <div className="skin-page-frame">
            <div className="header">
                <div className='header-logo'>
                    <div>{basic.appLogo}</div>
                    {
                        userData.firstName &&
                    <div className='header-notification'>
                        <i>Good {KNT.date.getGreetingTime()} {userData.firstName}</i>
                    </div>
                    }
                </div>
                <div className='header-label'>
                <h3> {header} </h3>
                </div>
                <div className='header-menu'>
                    <div onClick={() => setView("Profile")}>
                        <FiUser /> {username}
                    </div>
                    <div>
                        <Logout/>
                    </div>
                </div>
            </div>            
            <div className="skin-contents">
                <Switcher onChange={(re) => {setHeader(re); setView(re)}}  subLinks={subLi} />
            </div>     
            {basicJSX.poweredBy}
            {basicJSX.footer}       
            {/* <div className="skin-footer"><i>(c) kaynetpc 2021</i></div>            */}
        </div>       
        </div>
    )
}
export default (connect)(mapStateToProp)(SkinPage);