import React from 'react';
import './TitleLabel.css'

interface Props {
    children?: React.ReactNode;
    contents?: Array<React.ReactNode>;
    title: string;
    iconRight?: React.ReactNode | string;
}

export const TitleLabel = ({title = "", iconRight}: Props) => {
    return (
        <div className="title-label">
            <span className="label-text">{title}</span>
            {iconRight && <span className="label-right-icon">{iconRight}</span>}
        </div>
    )
}
