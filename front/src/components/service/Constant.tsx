

/**
 * 
 */
// const creatFeatures = ()

import { useSelector } from "react-redux";
import { KNT } from "../../dependencies/js/knt";
import SubLinks from "../windows/SubLinks/SubLinks";
import { adminData } from "./ConstantData";
import { IReducersState } from "./Reducers";

export const baseUrl = "http://localhost:8080";
// export const baseUrl = "http://localhost:99";

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



export const defaultRoles = KNT.array.extractByKeys(SubLinks, ["id", "name"]);

export const adminKey = "bvhgghhvghvbvghhjghgffghghghhgfggfghfgxfgcfgghgcfgvghcfgvghgghghhggvghggcghbhgvghkhvtgbyugt";

export const adminBasic = {
    roles: KNT.array.getValuesArrayByKey(defaultRoles, "id").filter((val) => val !== 13) as number[],
    ...adminData(adminKey)
}




export const userBasicRoles = [3]
export const MSG = {
    fieldRequiredMSG: (name: string) => `${name} is required!`,
    confirmMSG: "Save now ?", 
    confirmLogoutMSG: "About to logout?", 
    vote: (name: string) => `Vote for ${name} ?`
}



