

/**
 * 
 */
// const creatFeatures = ()

import { useSelector } from "react-redux";
import { IReducersState } from "./Reducers";

export const baseUrl = "http://localhost:99";

export const connectionStatus = { connected: 1, blocked:  2, incorrect : 3, failed : 4, not_exist:  0 };

export const UserData = () => {


    let temp = {
        username: "",
        gender: "",
        image: "",
        title: "Mr",
        date: "",
        lastName: "",
        firstName: "",
        dateOfBirth: "",
        status: 0,
        message: ""
    }


    const user = useSelector<IReducersState>(state => state.userData);
    
    // JSON.parse(localStorage.getItem('user_basic_info')
    return temp || user;
}


export const MSG = {
    fieldRequiredMSG: (name: string) => `${name} is required!`,
    confirmMSG: "Save now ?", 
    vote: (name: string) => `Vote for ${name} ?`
}



