export interface IReducersState {
    title: string;
    userData: IUserData;
}
export interface IUserData {
    username: "",
    gender: "",
    image: "",
    title: "Mr",
    date: "",
    lastName: "",
    firstName: "",
    dateOfBirth: "",
    status: 0,
    message: "",
    rolesId: number[]
}
const initialState: IReducersState = {
    title: "Login",
    userData: {
        username: "",
        gender: "",
        image: "",
        title: "Mr",
        date: "",
        lastName: "",
        firstName: "",
        dateOfBirth: "",
        status: 0,
        message: "",
        rolesId: []
    }
}

export const Reducers = (state = initialState, action: any): IReducersState => {
    switch (action.type) {
        case "setTitle":
            return {...state, title: action.data}    
        case "setUserData":
            return {...state, userData: action.data}    
        default:
            return state;
    }
}

export const mapStateToProp = (state: IReducersState) => {
    return state;
}