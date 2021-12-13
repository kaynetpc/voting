import React from 'react'
import Table from '../../../../dependencies/table/Table'
import { TitleLabel } from '../../../../dependencies/views/TitleLabel'

function VotingList() {
    
    const onActionOptionClick = (item, val) => {
        console.log(item, val)

    }

    const onActionOptions = () => {
        return [
            {value: "view", title: "Click to view", label: "View"},
            {value: "delete", title: "Click to view", label: "Remove"},
        ]
    }

    // const http = {url: "https://jsonplaceholder.typicode.com/usersl", type: "GET"};

    return (
        <div style={{width: "100%"}}>
            {
                candidate.map((x, i) => (
                    <div>
                        <div>
                            {x.name}
                            {x.post.name}
                            {x.post.title}
                        </div>
                        <TitleLabel title={x.name} contents={[<h1>H!</h1>, <h4>H4</h4>]} iconRight={"ICO"} />
                        <Table  data={x.users} onActionOptions={onActionOptions()} onActionOptionClick={onActionOptionClick} />       
                    </div>
                ))
            }

        </div>
    )
}

export default VotingList



const candidate = [
    {
        name: "2021 election",
        level: "Faculty Level",
        date: "01-01-2021",
        post: {
            id: 2,
            name: "presidency",
            title: "",
            active: true            
        },
        description: [],
        users: [
            {
                userId: "k",
                title: "",
                firstName: "",
                lastName: "",
                image: "",
                userDetails: [
                    {
                        name: "HND GP",
                        value: "3.6"
                    }
                ]
            }
        ]

    }
]