import { ReactNode, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { KNT } from '../../../dependencies/js/knt';
import { Switcher } from '../../../dependencies/switcher/Switcher';
// import { UserData } from '../../service/Constant.tsx';
import { IReducersState, mapStateToProp } from '../../service/Reducers';
import SubLinks from '../SubLinks/SubLinks';

import './SkinPage.css'
interface Props extends IReducersState {
    page?: ReactNode,
}

const SkinPage = ({userData, page}: Props) => {
    // const user = UserData();
    // const title: string = useSelector<IReducersState>(state => state.title) as string;
    // const user: IUserData = useSelector<IReducersState>(state => state.userData) as IUserData;

    const username = sessionStorage.getItem("username");
    const dispatcher = useDispatch();


    const store = sessionStorage.getItem("user_basic_data");

    
    useEffect(() => {
        store && dispatcher({type: "setUserData", data: JSON.parse(store)});
    }, [store]);
    
    
    // if(username === null || username === undefined){navigate("/")}
    return (
        <div className="skin-home">
            <div className="skin-page-frame">
            <div className="skin-header">
                <h3>Good {KNT.date.getGreetingTime()} {userData.firstName}</h3>
                <span>{username}</span>
            </div>            
            <div className="skin-contents">
                <Switcher  subLinks={KNT.array.extractByKeyValues(SubLinks, "id", [1, 2, 3, 4, 5, 6, 8])} />
            </div>            
            <div className="skin-footer"><i>(c) kaynetpc 2021</i></div>           
        </div>       
        </div>
    )
}
export default (connect)(mapStateToProp)(SkinPage);