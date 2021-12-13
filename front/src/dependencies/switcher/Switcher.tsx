import React, { ReactElement, useState } from 'react';
import { KNT } from '../js/knt';
import './Switcher.css';

type TSubLink = {
    name: string;
    value: ReactElement;
}

interface Props {
    subLinks?: Array<TSubLink>;

}


export const Switcher = ({subLinks = [{name: "", value: <></>}]}: Props): ReactElement => {

    const [current, setCurrent] = useState(subLinks[0].name)

    const currentView = (currentView: string) => {
        return KNT.array.extractByKeyValue(subLinks, "name", currentView)[0].value as ReactElement;
    }

    const activeBtn = (name: string) => {
        if(current === name) return "switcher-switch-btn-active";
        return "";
    }



    return (
        <div className='switcher'> 
            <div className='switcher-contents'>
                {currentView(current)}
            </div>
            <div className='switcher-btn-wrapper'>
                {subLinks.map((x, i) => <span className={'switcher-switch-btn '+activeBtn(x.name)} key={i} onClick={() => setCurrent(x.name)} >{KNT.string.titleCase(x.name)}</span>)}
            </div>
        </div>
    )
}
