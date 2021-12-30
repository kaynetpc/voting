import { useEffect, useState } from "react";
import { Form } from "../../../dependencies/form/Form";
import { JHttp } from "../../../dependencies/js/Jpc";
import { KNT } from "../../../dependencies/js/knt";
import { baseUrl, MSG } from '../../service/Constant';

interface Props {
    
}

export const CreatePosts = (props: Props) => {

    const [level, setLevel] = useState("")


    const [data, setData] = useState([])

    
    useEffect(() => {
        const getList = () => {
            JHttp.get(`${baseUrl}/cat/get/list`, (data: any) => {
                setData(data)
            }, (err: any) => console.log(err))
        }
        getList();

    }, [])



    const makeInputSchema = (arr: string[]) => {
        const res: { name: string; type: string; control: { type: string; label: string; placeholder: string; }; }[] = [];
        arr.forEach(el => {
            const label = KNT.string.titleCase(el);
            res.push({
                name: el,
                type: "input",
                control: {
                    type: "text",
                    label: label,
                    placeholder: `Supply ${label}`
                }
            })
        });

        return res;
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
                label: "Select Level",
                placeholder: "Gender"
            }
        },
        ...makeInputSchema(["name","title","aim", "objectives", "description"])
    ];


    const submit = (response : object) => {
        const formData = [
            {
                level: level,
                posts: [response]
            }
        ];

        KNT.validateField.validate([response], (field: string) => alert(MSG.fieldRequiredMSG(field)), () => {
            if(window.confirm(MSG.confirmMSG)){
                JHttp.post(`${baseUrl}/cat/create/posts`, formData, (res: string) => alert(res), (err: any) => console.log(err))
            }
        })

    }
    const change = (e: any) => {
        const {name, value} = e.target;

        if(name === "level"){
            setLevel(value);
        }
    }

    return (
        <div className="container">
            <Form schema={schema} label="Create Post" onChange={change} onSubmit={submit} />
        </div>
    )
}
