import React, { useEffect, useState } from 'react'
import Button from '../../dependencies/button/Button';
import { Form } from '../../dependencies/form/Form'
import { JHttp } from '../../dependencies/js/Jpc'
import { KNT } from '../../dependencies/js/knt';
import TileSelect from '../../dependencies/tileSelect/TileSelect';
import { baseUrl, MSG } from '../service/Constant'

function AssignRole() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userTypes, setUserTypes] = useState([]);

    const fetchUsers = () => {
        JHttp.get(`${baseUrl}/user/get/list`, (data) => {
            setUsers(data);
        }, (err) => {console.log(err)})
    }
    const fetchUserTypes = () => {
        JHttp.get(`${baseUrl}/user/list/type`, (data) => {
            setUserTypes(data);
        }, (err) => {console.log(err)})
    }

    const fetchRoles = () => {
        JHttp.get(`${baseUrl}/role/get/list`, (data) => {
            // const newData = KNT.array.removeByKeyValues(data, "id");
            setRoles(data);

        }, (err) => {console.log(err)})
    }

    useEffect(() => {
        fetchUsers();
        fetchRoles()
        fetchUserTypes()
    }, []);
    
    const schema = [
        {
            name: "type",
            type: "select",
            values: userTypes,
            control: {
                type: "select",
                renderKey: "name",
                valueKey: "name",
                label: "User Type",
            }
        },
        {
            name: "rolesId",
            type: "select",
            values: roles,
            control: {
                type: "tileSelect",
                renderKey: "name",
                valueKey: "id",
                label: "Election",
            }
        }
    ]

    const handleSubmit = (data) => {
        if(window.confirm(MSG.confirmMSG)){
            JHttp.post(`${baseUrl}/role/create`, data, (res) => {alert(res)}, (err) => {console.log(err)})
        }

    }

    const handleChange = () => {

    }

    const submitButton = (data) => {
        const pro = data;
        return <div style={{paddingTop: "150px"}} >
                   <Button label='SAVE Now' onClick={() => handleSubmit(pro)} />
                </div>
    }
    
    return (
        <div className='container'>
            <Form schema={schema} onSubmit={handleSubmit} label="Submit Request" userButton={(e) => submitButton(e)}  onChange={handleChange} />        
        </div>
    )
}

export default AssignRole
