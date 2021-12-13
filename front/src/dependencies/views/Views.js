import React from 'react';
import './View.css';

export function Row({ name, value }) {
    return (
        <tr>
            <td className="row-key">{name}:</td>
            <td>{value}</td>
        </tr>
    );
}

export function UIRadio(props) {
    //<RadCheck name={name} value={value} onChange={onChange} className={className} checked={checked} type="rad" defaultChecked={defaultChecked}/>
    return <RadCheck {...props} type="rad" />

}

export function UICheckBox(props) {

    return <RadCheck {...props} type="chk" />

}


function RadCheck({ name, value, onChange, className, checked, type, label }) {

    const handleChange = (e) => {
        onChange(e, e.target.value);
    }

    function capName(name = "") {
        return name.charAt(0).toUpperCase() + name.substr(1);
    }

    let type2 = type === "rad" ? "radio" : "checkbox";
    let classValue = type === "rad" ? "ui-radio" : "ui-checkbox";
    return (
        <React.Fragment>
            <input type={type2} className={`${classValue} ${className}`} checked={checked} name={name} value={value} onChange={handleChange} />
            <label className="ui-radchk-label">{label !== undefined ? label : capName(value)}</label>
        </React.Fragment>

    );
}


export function UITable({ className, header = [], primaryKey = "id", capCase = false, subHeader = {}, body = [], onRowSelected }) {

    let camelToSpace = (camel) => {

        // finds if this column is substituted in the subHeader, if true it replaces it.
        if (subHeader[camel] !== undefined) return subHeader[camel];

        var spaced = "";
        let regexp = /[A-Z]/;

        if (camel.length > 0) {

            camel.split("").forEach((e, i) => {

                if (i === 0) {
                    spaced = e.toUpperCase();
                } else {
                    if (regexp.test(e)) {
                        spaced += capCase === false ? " " + e.toLocaleLowerCase() : " " + e;
                    } else {
                        spaced += e;
                    }
                }

            });

            return spaced;
        }
        return "";
    }
    return (
        <table className={`ui-table ${className}`}>
            <thead>
                <tr>
                    {header.map((e, i) => (<th key={i}>{camelToSpace(e)}</th>))}
                </tr>
            </thead>
            <tbody>
                {body.map((e, i) => (<UITableRow e={e} i={i} pk={e[primaryKey]} onRowSelected={onRowSelected} keys={header} />))}
            </tbody>
        </table>
    );
}

function UITableRow({ e, pk, i, onRowSelected, keys = [] }) {

    const processRow = (obj) => {
        let rows = [];
        keys.forEach(e => rows.push(obj[e] === undefined ? "" : obj[e]));
        return rows;
    }

    return (
        <tr onClick={() => onRowSelected(pk, i)} style={{ cursor: "pointer" }}>
            {processRow(e).map((e, i) => (<td key={i}>{e}</td>))}
        </tr>
    );
}

/**
 * 
 * A window that renders over other windows. Visibility can be controlled by changing the state of the component through 
 * the onShow prop and it has another prop-onClosed to update the visibility state within a preferred logic. 
 * 
 */
export function UIWindow({ onClosed, onShow = false, className = "", children, title, style={} }) {
    let defStyle = "ui-window-hide";
    let actStyle = "ui-window-show";

    return (
        <div className={`${className} ${onShow ? actStyle : defStyle} ui-window`} style={style}>
            <div className="ui-window-close-wrapper">
                <h3>{title}</h3>
                <span onClick={onClosed.bind(null, "x")}>&times;</span>
            </div>
            <div className="ui-window-body">{children}</div>
        </div>
    );
}