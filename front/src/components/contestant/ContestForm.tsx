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


const [data, setData] = useState([]);


    
useEffect(() => {
    const getList = () => {
        JHttp.get(`${baseUrl}/cat/get/list`, (data: any) => {
            console.log(data);
            setData(data)
        }, (err: any) => console.log(err))
    }
    getList();

}, []);


const handleChange = (e: any) => {
    const {name, value} = e.target;

    console.log(name, value);

    if(name === "level"){
        // console.log(data);
        const posts = KNT.array.extractByKeyValue(data, "name", value)[0]["posts"];
        setPosts(posts)
    }
}

    

const schema = [
    {
        name: "level",
        type: "select",
        values: data,
        control: {
            type: "select",
            renderKey: "name",
            valueKey: "name",
            label: "Election Level",
        }
    },
    {
        name: "level",
        type: "select",
        values: ["Mr", "Mrs", "Miss"],
        control: {
            type: "select",
            renderKey: "name",
            valueKey: "name",
            label: "Election Level",
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


