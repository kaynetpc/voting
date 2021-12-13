import './LabelView.css'
import { ReactElement } from 'react';
interface Props {
    value: ReactElement | string | number;
    label: string | ReactElement | number;
}

export const LabelView = ({label, value}: Props) => {
    return (
        <div className='label-view'>
            <div className='label-view-label' >{label}:</div>            
            <div className='label-view-value' >{value}</div>            
        </div>
    )
}
