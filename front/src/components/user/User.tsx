import React from 'react'
import Table from '../../dependencies/table/Table'
import { baseUrl } from '../service/Constant'

interface Props {
    
}

export const User = (props: Props) => {
    return (
            <Table http={{url: `${baseUrl}/user/get/list`, type: "GET" }}  />
    )
}
