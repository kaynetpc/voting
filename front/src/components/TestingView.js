import React from 'react'
import VotingList from './activities/election/vote/VotingList'
import { LandingPage } from './windows/landingPage/LandingPage'

function TestingView() {


    return (
            <LandingPage 
            page={<VotingList />} title="Contestant List" >
            </LandingPage>
            
    )
}

export default TestingView
