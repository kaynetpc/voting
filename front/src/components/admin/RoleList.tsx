import React from 'react'
import Table from '../../dependencies/table/Table'
import { baseUrl } from '../service/Constant'

interface Props {
    
}

export const RoleList = (props: Props) => {
    return (
        <div>
            <Table http={{url: `${baseUrl}/role/get/list`, type: "GET"}} />
        </div>
    )
}
