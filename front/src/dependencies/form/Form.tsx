import React, { useState } from 'react'
import Button from '../button/Button'
import { InputField } from '../InputFIeld/InputField'
import './Form.css'

interface Props {
    schema: Array<any>;
    onSubmit?: (re: object) => void;    
    onChange?: (e: Event) => void; 
    label?: string;   
}

export const Form = ({schema, label, onChange, onSubmit}: Props) => {

    const [state, setState] = useState({});


    const handleChange = (e : any) => {
        e.preventDefault();
        const {name, value} = e.target;
        
        setState(pr => ({...pr, [name]: value}));


        onChange && onChange(e)
    }
    

    
    return (
        <div className='form' >
            {
                schema.map((x: any, i: number) => (
                    x.type === "select"?
                    (
                        x.control.type === "select"?
                        <InputField typeRender="renderSelect"  values={x.values} {...x.control} name={x.name} label={x.control.label} placeholder={x.control.placeholder} onChange={handleChange} />
                        :
                        <InputField typeRender="renderRadio" values={x.values}  {...x.control} name={x.name} label={x.control.label} placeholder={x.control.placeholder} onChange={handleChange} />

                    )
                    :
                    <InputField name={x.name} {...x.control} label={x.control.label} placeholder={x.control.placeholder} onChange={handleChange} />
                ))
            }
            <div className="login-reg-btn-wrapper">
                <Button  label={label || "Submit"}   onClick={() => onSubmit && onSubmit(state)} />
            </div>  
        </div>
    )
}




/**Schema sample below */

export const schemaSample  = [
    {
        name: "firstName",
        type: "input",
        control: {
            type: "text",
            label: "First Name",
            placeholder: "Enter First Name"
        }
    },
    {
        name: "lastName",
        type: "input",
        control: {
            type: "text",
            label: "Last Name",
            placeholder: "Enter Last Name"
        }
    },
    {
        name: "gender",
        type: "select",
        values: ["Male", "Female"],
        control: {
            type: "checkbox",
            label: "Gender",
            placeholder: "Gender"
        }
    },
    {
        name: "email",
        type: "input",
        control: {
            type: "text",
            label: "Email",
            placeholder: "Supply Email",
        }
    },
    {
        name: "phoneNumber",
        type: "input",
        control: {
            type: "number",
            label: "Phone Number",
            placeholder: "Phone Number"
        }
    },
    {
        name: "addressOne",
        type: "input",
        control: {
            type: "text",
            label: "Address",
            placeholder: "Address"
        }
    },
    {
        name: "password",
        type: "password",
        control: {
            type: "input",
            label: "Choose A Password",
            placeholder: "Password"
        }
    },
]
