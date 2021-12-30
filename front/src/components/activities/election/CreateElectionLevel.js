import React from 'react'
import { Form } from '../../../dependencies/form/Form'
import { JHttp } from '../../../dependencies/js/Jpc';
import { KNT } from '../../../dependencies/js/knt';
import { baseUrl, MSG } from '../../service/Constant';

function CreateElectionLevel() {
    


    const schema = [
        {
            name: "name",
            type: "input",
            control: {
                type: "text",
                label: "Level Name",
                placeholder: "Supply Election Level Name e.g State Election, Community or federal level"
            }
        },
        {
            name: "title",
            type: "input",
            control: {
                type: "text",
                label: "Title",
                placeholder: "Supply Title"
            }
        },
        {
            name: "hierarchy",
            type: "input",
            control: {
                type: "number",
                label: "Hierarchy",
                placeholder: ""
            }
        },
        {
            name: "description",
            type: "input",
            control: {
                type: "text",
                label: "Description",
                placeholder: "Description"
            }
        },
    ];

    const submit = (response) => {
        const data = [response];

        KNT.validateField.validate(data, (field) => alert(MSG.fieldRequiredMSG(field)),  () => {
            if(window.confirm(MSG.confirmMSG)){
                JHttp.post(`${baseUrl}/cat/create`, data, (res) => alert(res), (err) => console.log(err) );
            }
        })

    };


    return (
        <div className='container'>
            <Form schema={schema} label='Create Election Level' onSubmit={submit} />
        </div>
    )
}

export default CreateElectionLevel
