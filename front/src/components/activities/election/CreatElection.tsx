import { useEffect, useState } from "react";
import { Form } from "../../../dependencies/form/Form";
import { JHttp } from "../../../dependencies/js/Jpc";
import { KNT } from "../../../dependencies/js/knt";
import Table from "../../../dependencies/table/Table";
import { baseUrl, MSG } from "../../service/Constant";

interface Props {
    target?: string;
}


export const CreatElection = (props: Props) => {

const [levels, setLevels] = useState([]);
const [posts, setPosts] = useState([]);


    
useEffect(() => {
    const getList = () => {
        JHttp.get(`${baseUrl}/cat/get/list`, (data: any) => {
            setLevels(data)
        }, (err: any) => console.log(err))
    }
    getList();

}, [])


const handleChange = (e: any) => {
    const {name, value} = e.target;
    if(name === "level"){
        const main = KNT.array.extractByKeyValue(levels, "name", value)[0]
        main && main["posts"] && setPosts(main["posts"])
    }

}


const schema = [
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
            name: "name",
            type: "input",
            control: {
                type: "text",
                label: "Election Name",
                placeholder: "Enter Election name or title"
            }
        },
        {
            name: "description",
            type: "input",
            control: {
                type: "text",
                label: "Description",
                placeholder: "description"
            }
        },
        {
            name: "startDate",
            type: "input",
            control: {
                type: "date",
                label: "Start Date",
                placeholder: ""
            }
        },
        {
            name: "endDate",
            type: "input",
            control: {
                type: "date",
                label: "End Date",
                placeholder: ""
            }
        },
    ];


const submit = (response: object) => {
    const election: [{}] = [response];

    KNT.validateField.validate(election, (field: string) => alert(MSG.fieldRequiredMSG(field)),  () => {
        if(window.confirm(MSG.confirmMSG)){
            JHttp.post(`${baseUrl}/election/create`, election, (res: any | string) => alert(res), (err: any) => console.log(err) );
        }
    })

};

    return props.target === "form"?
    <Form schema={schema} label='Create Election' onSubmit={submit} onChange={handleChange} />
    :<Table http={{url: `${baseUrl}/election/get/list`, type: "GET" }} />

}


export default CreatElection;
