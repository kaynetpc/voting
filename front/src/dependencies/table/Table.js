import React, { Component} from 'react'
import { KNT } from '../js/knt'
import { SimpleText } from '../SimpleText/SimpleText'
import './Table.css'
import { JHttp } from './TableService.js'



const httpTest = {
    url: "", type: "GET"
}

const MSG = {
    unableToFetch: "Unable to fetch!"
}

const TABLE_ATOMIC_ID_UNIQUE_KNT = "TABLE_ATOMIC_ID_UNIQUE_KNT";

/**
 * 
 * @param {} actionColumn Define extra column for delete, edit and view in a select tag. Takes Boolean
 * 
 * @param {} http auto
 */


export class Table extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data: [], rawData: []
        }
    }


    componentDidMount(){
        this.handleAutoPopulate(this.props.data)
    }

    handleAutoPopulate = (data) => {
        if(this.props.http){
            this.handleURL(this.props.http, this.handleSuccess, this.handleFailure)
        } else if(data !== undefined && data !== null) {
            this.handleData(data);          
        } 
    }


    handleSuccess = (res) => {
        console.log(res)
        this.handleData(res);
    }


    handleFailure = (err) => {
        // alert(MSG.unableToFetch);
        console.error(err)
    }


    handleData = (data) => {
        const rawData = this.handleAtomicId(data, TABLE_ATOMIC_ID_UNIQUE_KNT);
        console.log("raw", rawData)
        const dataGet = KNT.array.extractArrayInArrayObject(rawData);
        const unRenderColumns = this.props.unRenderColumns || [];
        const newData = KNT.array.removeByKeys(dataGet.res, ["id", ...unRenderColumns])
        console.log(newData)
        this.setState({data: newData, unRenderKeys: dataGet.arrayKeys, unRenderData: dataGet.array, rawData: rawData});
    }


    handleAtomicId = (data = [], idLabel) => {
        const res = [];
        data.forEach((el, i) => {
            res.push({...el, [idLabel]: i})
        })
        console.log(res)
        return res;
    }

    handleURL = (http = {url: "", type: "GET", data: {}}, onSuccess, onFailure) => {
        if(http.type === "POST"){
            JHttp.post(http.url, http.data, (res) => onSuccess(res), (err) => onFailure(err));
        } else
        if(http.type === "GET"){
            JHttp.get(http.url, (data) => onSuccess(data), (err) => onFailure(err));
        }
    }

    renderThead = (data) => {
        let thead = KNT.array.getKeys(data);
        const theadJSX = (arr = []) => arr.map((x, i) => <th key={i}>{KNT.string.titleCase(x)}</th>);

        thead = KNT.array.removeMultiple([TABLE_ATOMIC_ID_UNIQUE_KNT], thead)

        const thActionColumn = this.tdActionColum()? "ACTION": null;
        if(thActionColumn !== null) thead.push(thActionColumn);

        if(thead.includes("id")){
            return (
                <>
                <th>SN</th>
                {theadJSX(KNT.array.removeMultiple(["id"], thead))}
                </>
            )
        } else  return theadJSX(["SN", ...thead]);
    }

    renderThBodySerialNumber = (sn, data) => {
        if(KNT.array.getKeys(data).includes("id")){
            return <td>{sn}</td>;
        }
        return <td align={KNT.validateField.checkNumber(sn)? "right": ""}>{sn}</td>;
    }


    renderBodyTd = (arr = []) => {
        const tbodyJSX = (data) => data.map((item, rowIndex) => {
            const valStore = Object.keys(item);
            return <tr key={rowIndex}>
                {this.renderThBodySerialNumber((rowIndex+1), data)}
                {
                    valStore.map((key, valKeyIndex) => (
                        key === TABLE_ATOMIC_ID_UNIQUE_KNT? null: 
                    <td align={KNT.validateField.checkNumber(item[key])? "right": ""} key={valKeyIndex}>{
                        this.props.onCostumeRendering?
                        this.props.onCostumeRendering(item[key], key, this.handleAtomicIdItems(item, true), rowIndex):
                        item[key]
                        }</td>
                    ))
                }
                {this.actionColumBody(item, item[TABLE_ATOMIC_ID_UNIQUE_KNT])}
            </tr>
        }) 

        return (<>{tbodyJSX(arr)}</>)
    }


    handleAtomicIdItems = (item, realData = false) => {
        console.log(item)
        const rowRealData = KNT.array.extractByKeyValue(this.state.rawData, TABLE_ATOMIC_ID_UNIQUE_KNT, item[TABLE_ATOMIC_ID_UNIQUE_KNT]);
        const rowData = KNT.array.removeByKeys(rowRealData, [TABLE_ATOMIC_ID_UNIQUE_KNT])[0];
        
        return realData? rowRealData[0]:  rowData;

    }


    handleActionOptionClick = (item, val) => {

        const rowData = this.handleAtomicIdItems(item, val);

        console.log("A", rowData)

        this.props.onActionOptionClick && this.props.onActionOptionClick(val, rowData);
        this.setState({actionSelected: ""})
    }

    actionColumBody = (item, index) => {
        let res = null;
        if(this.props.onActionOptions){
            return res =  (
                <td key={index}>
                <select className="table-select" value={this.state.actionSelected} onChange={(e) => this.handleActionOptionClick(item, e.target.value)} name="actionSelected">
                    <option value="">--select--</option>
                    {
                        this.props.onActionOptions && this.props.onActionOptions.map((x ,i) => <option key={i} value={x.value} title={x.title}>{x.label}</option>)
                    }
                </select>
                </td>
            )
        }
        return res;
    }

    tdActionColum = () => {
        let res = false;
        if(this.props.actionColum || this.props.onActionOptions){
            return true
        }
        return res;
    }

    
    tdData = (val) => {
        return KNT.object.isObject(val)? null: (val === null? "Null": (val === true? 'True': (val === false? "False": val)));
    }



    noDataRetrieve = () => {
        return  <SimpleText text={"No data retrieve"} />
    }
    
    render() {
        return (
            <div style={{width: "100%"}}>
                {this.props.onCompBeforeTable && this.props.onCompBeforeTable(this.state.rawData)}
                <table className="table">
                    <thead>
                        <tr>
                            {this.renderThead(this.state.data)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.length > 0? this.renderBodyTd(this.state.data) : this.noDataRetrieve()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;

