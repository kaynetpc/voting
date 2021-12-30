import React, { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { BarChart } from '../../../../dependencies/chart/bar/BarChart'
import { PieChart } from '../../../../dependencies/chart/pie/PieChart'
import { JHttp } from '../../../../dependencies/js/Jpc'
import { KNT } from '../../../../dependencies/js/knt'
import Table from '../../../../dependencies/table/Table'
import { TitleLabel } from '../../../../dependencies/views/TitleLabel'
import { UIWindow } from '../../../../dependencies/views/Views'
import { baseUrl } from '../../../service/Constant'
import { Dashboard } from './Dashboard'

function VotingList() {

    const [show, setShow] = useState(false);
    
    
    const [electionData, setElectionData] = useState([]);
    
   

    const http = {url: `${baseUrl}/vote/list`, type: "GET"};


    useEffect(() => {
        const fetch = () => {
            JHttp.get(`${baseUrl}/vote/list`, (data) => {
                setElectionData(data);
            }, (err) => console.log(err))
        }
        fetch()
    }, [])

  
    const constructData = (data) => {

       let temp = KNT.array.groupArrayObjectByKey(data, "postName", "title", "contents")
       let res = {};

       temp.forEach(el => {
           const content = el.contents || [];
           const title = el.title;
           
           const store = [["Candidate", "Vote"]];
           content.forEach(co => {
               const vote = co.total;
               const name = co.lastName+" ("+co.lastName+")";
                store.push([name, vote]);
           });

           res[title] = store;
           
       });
       return res;

    }

    


    return (
        <div style={{width: "100%"}}>
            <TitleLabel title={"Votes"} iconRight={<FiEye onClick={() => setShow(true)} />} />
            <Table unRenderColumns={["hierarchy"]}  http={http}  /> 
            <UIWindow onShow={show} onClosed={() => setShow(false)}  title={"Votes Stats"}>
                {
                    electionData && Object.keys(constructData(electionData)).map(x => {
                        const each = constructData(electionData)[x]
                        return <div>
                            <div style={{width: "100%"}}>
                                <TitleLabel title={'Vote Bar Chart for '+x}/>
                            {each && <BarChart title='Voting Result' data={each} />}
                            </div>
                            <div style={{width: "100%"}}>
                                <TitleLabel title='Vote Pie Chart'/>
                                {each && <PieChart title="Vote Pie Representation" data={each}/>}
                            </div>                            
                        </div>
                    })
                }
            </UIWindow>
        </div>
    )
}

export default VotingList


