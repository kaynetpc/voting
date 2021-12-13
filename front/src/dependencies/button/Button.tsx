import React, { CSSProperties, MouseEvent } from 'react'
import './Button.css'


export interface ButtonProps {
	children?: React.ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    loading?: boolean;
    loadingIcon?: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    type?: string | undefined;
    // field: Array<any>
    icon?: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    tag?: string;
}


export const Button: React.FC<ButtonProps> = props => {

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if(!props.loading && props.active){
            props.onClick && props.onClick(e);
        } else if(props.active === undefined) {
            props.onClick && props.onClick(e);
        }
    }
    

    const tag = props.tag !== undefined? ((props.tag === "c" || props.tag === "cancel")? "cancel-btn": ""): "";

    // type TButtonType = "button" | "reset" | "submit";
    // const btnType: TButtonType = props.type !== undefined? props.type: 'button';

    const disable = props.active !== undefined? (!props.active) : (props.disabled !== undefined? props.disabled: false);


    return (
        tag === "cancel-btn"?
        <button style={props.style} type="button" onClick={handleClick} disabled={disable}  className={[
            props.loading?" button-load": "cancel-btn",
             " button ",
            props.className
        ].join(" ")}>
            {props.loading? (props.loadingIcon? props.loadingIcon: loadingAnim()) : null}
            {props.label? props.label : (props.children? props.children: null)}
            <span>{props.icon}</span>
        </button>
        :
        <button style={props.style}  onClick={handleClick} disabled={disable}  className={[
            (props.active !== undefined? props.active: true)? " button-active": props.loading?" button-load": " button-inactive", 
            " button ",
            props.className
        ].join(" ")}>
            {props.loading? (props.loadingIcon? props.loadingIcon: loadingAnim()) : null}
            {props.label? props.label : (props.children? props.children: null)}
            <span>{props.icon}</span>
        </button>
    )
}


export default Button;


const loadingAnim = () => {
    const loading = true;
    return (
        <span style={{display: "inline", marginRight: "20px"}}>
            <span 
                className={[
                    "loadingio-spinner-ripple-nh4uy9grwwb",
                    loading ? "button-loading" : "",
                ].join(" ")}
            >
                <div className="ldio-37yklr482oa">
                    <div></div>
                    <div></div>
                </div>
            </span>
        </span>
    )
}