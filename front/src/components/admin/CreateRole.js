import React from 'react'
import Button from '../../dependencies/button/Button'
import { JHttp } from '../../dependencies/js/Jpc'
import { baseUrl, defaultRoles, MSG } from '../service/Constant'
import { RoleList } from './RoleList'

function CreateRole() {
    const submit = () => {
        if(window.confirm(MSG.confirmMSG)){
            JHttp.post(`${baseUrl}/role/init`, defaultRoles, (res) => alert(res), (err) => console.log(err))
        }
    }
    return (
        <div className='container'>
            <RoleList />
            <div className='container' style={{float: "right"}} >
                <Button onClick={submit}  
                label='Initialize Default Roles' />        
            </div>
        </div>
    )
}

export default CreateRole



