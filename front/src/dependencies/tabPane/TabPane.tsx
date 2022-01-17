import React, { useEffect, useState } from 'react'
import { ReactNode } from 'react';
import './TabPane.css';

interface Props {
    tab: string[];
    pane: ReactNode[];
}

export const TabPane = (props: Props) => {
    const [tabCount, setTabCount] = useState(-1);
    useEffect(()=> {
        (props.tab[0] !== undefined) && setTabCount(0); 
    },[])
    return (
        <div className='tab-pane'>
            <div className='tab_container'>{props.tab.map((x, i) => <div className={'tab '+(tabCount === i? "active ": "")} onClick={() => {setTabCount(i)}}>{x}</div>)}</div>
            <div className='pane'>
                {(tabCount !== -1) && props.pane[tabCount]}
            </div>
        </div>
    )
}
