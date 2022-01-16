import React, { ReactElement, useState } from 'react';
import { KNT } from '../js/knt';
import './Switcher.css';
import { useEffect } from 'react';

type TSubLink = {
    name: string;
    value: ReactElement;
}

interface Props {
    subLinks?: Array<TSubLink>;
    onChange?: (e: any) => void;
    onPageChange?: (e: any) => string;

}


export const Switcher = ({subLinks = [{name: "", value: <></>}], onChange, onPageChange}: Props): ReactElement => {
    
    const [subLink, setSubLink] = useState(subLinks)
    
    const [current, setCurrent] = useState(subLinks[0].name)
 

    useEffect(() => {
        if(subLink !== subLinks){
            setSubLink(subLinks);
        } 
    }, [subLinks])


    /**
    useEffect(() => {
        // alert("h")
        const action = () => {
            const keys = KNT.array.getValuesArrayByKey(subLink, "name");
            if(keys.includes(onPageChange) && current !== onPageChange){
                onPageChange && setCurrent(onPageChange);
            }
        }
        action();
    }, [current])

     **/



    const currentView = (currentView: string) => {
        if(current !== undefined){
            const res = (subLink.length > 0) && (KNT.array.extractByKeyValue(subLink, "name", currentView)[0] && KNT.array.extractByKeyValue(subLink, "name", currentView)[0]["value"]) as ReactElement;
            onChange && onChange(current)
            return res;
        } else return <div>ERROR {currentView}</div>
    }

    const activeBtn = (name: string) => {
        if(current === name) return "switcher-switch-btn-active";
        return "";
    }



    return (
        <div className='switcher'> 
        {/* jjj{onPageChange? onPageChange: "nothin"} */}
            <div className='switcher-contents'>
                {currentView(current)}
            </div>
            <div className='switcher-btn-wrapper'>
                {subLink.map((x, i) => x.name && <span className={'switcher-switch-btn '+activeBtn(x.name)} key={i} onClick={() => setCurrent(x.name)} >{KNT.string.titleCase(x.name)}</span>)}
            </div>
        </div>
    )
}
