import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "../../dependencies/form/Form"
import { JHttp } from "../../dependencies/js/Jpc";
import { KNT } from "../../dependencies/js/knt";
import { baseUrl, MSG } from "../service/Constant";
import { IReducersState, IUserData } from "../service/Reducers";

interface Props {
    
}


export const ContestForm = (props: Props) => {


const user: IUserData = useSelector<IReducersState>(state => state.userData) as IUserData;


const [posts, setPosts] = useState([]);


const [levels, setLevels] = useState([]);

const [election, setElection] = useState([]);


    
useEffect(() => {
    const getList = () => {
        JHttp.get(`${baseUrl}/election/get/list`, (data: any) => {
            setElection(data)
        }, (err: any) => console.log(err))
    }
    getList();

}, []);

    

useEffect(() => {
    const getListLevel = () => {
        JHttp.get(`${baseUrl}/cat/get/list`, (data: any) => {
            setLevels(data)
        }, (err: any) => console.log(err))
    };
    getListLevel();
}, []);


const handleChange = (e: any) => {
    const {name, value} = e.target;

    console.log(name, value);

    if(name === "level"){
        const main = KNT.array.extractByKeyValue(levels, "name", value)[0]
        main && main["posts"] && setPosts(main["posts"])
    }
}

    

const schema = [
    {
        name: "name",
        type: "select",
        values: election,
        control: {
            type: "select",
            renderKey: "name",
            valueKey: "name",
            label: "Election",
        }
    },
    {
        name: "level",
        type: "select",
        values: levels,
        control: {
            type: "select",
            renderKey: "name",
            valueKey: "name",
            label: "Election Level",
        }
    },
    {
        name: "postId",
        type: "select",
        values: posts,
        control: {
            type: "select",
            renderKey: "name",
            valueKey: "id",
            label: "Post",
            placeholder: "Gender"
        }
    },
    {
        name: "firstName",
        type: "input",
        control: {
            value: user.firstName,
            type: "text",
            label: "First Name",
            placeholder: "Enter First Name",
            readOnly: true,
        }
    },
    {
        name: "lastName",
        type: "input",
        control: {
            value: user.lastName,
            readOnly: true,
            type: "text",
            label: "Last Name",
            placeholder: "Enter Last Name"
        }
    },
    {
        name: "aim",
        type: "input",
        control: {
            type: "text",
            label: "Aim",
            placeholder: "Supply Aim",
        }
    },
    {
        name: "objective",
        type: "input",
        control: {
            type: "text",
            label: "Objective",
            placeholder: "What are your objectives",
        }
    },
]

const handleSubmit = (res: object) => {

    let formDataB = {
        ...res,
        gender: "male",
        userId: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        descriptions: [
            {name: "", title: "", text: ""}
        ],
    }

    const formData: [{}] = [formDataB];

    console.log(formData);
    


    KNT.validateField.validate(formData, (res: string) => alert(res), () => {
        if(window.confirm(MSG.confirmMSG)){
            JHttp.post(`${baseUrl}/election/add/req/contestant`, formData, (res: any) => alert(res), (err: any) => console.log(err));
        }
    });
}


    return (
        <div className="container">
            <Form schema={schema} onSubmit={handleSubmit} label="Submit Request" onChange={handleChange} />            
        </div>
    )
}


