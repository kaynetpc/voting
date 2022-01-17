import React from 'react'
import { Form } from '../../dependencies/form/Form'
import { JHttp } from '../../dependencies/js/Jpc'
import Table from '../../dependencies/table/Table'
import { baseUrl, MSG } from '../service/Constant'

interface Props {
    
}

export const User = (props: Props) => {
    return (
            <Table http={{url: `${baseUrl}/user/get/list`, type: "GET" }}  />
    )
}


export const AddUserType = (props: Props) => {

    const checkFirstKey = (obj:  any): boolean => {
        const f_key: string | number = Object.keys(obj)[0];
        const val = obj[f_key];
        return val === "" || val === null || val === undefined;
    }
    const handleSubmit = (data: any) => {
        console.log(data);

        if(window.confirm(MSG.confirmMSG)){
            JHttp.post(`${baseUrl}/user/create/type`, [data], (res: string | any) => {alert(res)}, (err: any) => {console.log(err)})
        }

    }
    return (
            <Form 
            onSubmit={handleSubmit}
            label="Save Type"
            schema={[
                {
                    name: "name",
                    type: "input",
                    control: {
                        placeholder: "Enter type",
                        renderKey: "name",
                        valueKey: "name",
                        label: "User Type",
                    }
                }
            ]}  />
    )
}
