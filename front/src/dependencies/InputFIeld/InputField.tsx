import { ReactElement, useState } from 'react';
import './InputField.css';
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs';
import TileSelect from '../tileSelect/TileSelect';


interface Props {
  label?: string;
  name: string;
  value?: string;
  values?: string[];
  placeholder?: string;
  type?: string;
  typeRender?: string;
  renderKey?: string;
  valueKey?: string;
  id?: any;
  readOnly?: boolean;
  count?: number;
  onChange: (e: any) => void;
}


export const InputField = ({label, name, value, typeRender = "renderInput", id, placeholder, values, renderKey, valueKey, onChange, type, readOnly = false, count = 0}: Props) => {


  const [typeV, setTypeV] = useState(type);

  const [currentValue, setCurrentValue] = useState(value)


  const handleChange = (e: any) => {
    const {value} = e.target;
    
    setCurrentValue(value);
    onChange && onChange(e)
    
    
  }


  const handleSelect = (res: any) => {    
    setCurrentValue(res.name);
    onChange && onChange(res)
  }
  
  const tInputField =  (
    <div className="input-field">
        <span className="input-label" >{label}: </span>
      <input
        name={name}
        id={id}
        type={typeV}
        value={currentValue}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={handleChange}
      ></input>
      {type === "password"? <i className="input-field-eye-toggle" onClick={() => {typeV === "password"? setTypeV("text"): setTypeV("password")}} >{typeV === "password"? <BsFillEyeSlashFill />: <BsFillEyeFill />}</i>: null}
    </div>
  );


  const tRadioSelect = (
    <div className="input-field-radio-select">
      <span className="input-label" >{label}</span>
      <div className="input-field-radio-select-child-wrapper">
      {values?.map((val, i) => (
        <div className="input-field-radio-select-child">
          <label htmlFor={val+i} >{val}</label>
            <input
            id={val+i}
            name={name}
            type="radio"
            value={val}
            onChange={(e) => onChange && onChange(e)}
          />
          </div>
          ))}
          </div>
    </div>
  )

  const tileSelect = (
    <div className="input-field-radio-select">
      <span className="input-label" >{label}</span>
      <div className="input-field-tile-select-child-wrapper">
        <TileSelect renderKey={renderKey} valueKey={valueKey} onSelect={handleSelect}  data={values}  name={name} count={values?.length || count}  />
      </div>
    </div>
  )


  interface TOption {
    [key: string]: number | string
  }

  const arr: TOption[] | string[] = [];
  const handleOptions = (array = arr, renderKey?: string, valueKey?: string): ReactElement => {
    // let arr: TOption[]  = [{name:"kk", val: "700"}];
    let res = [];
    if ( (array.length > 0) && (typeof array[0] === "object") && (valueKey !== undefined) && (renderKey !== undefined)) {
      for (let i = 0; i < array.length; i++) {
        const val = array[i] as TOption;
         res.push(<option key={i} value={val[valueKey]} label={val[renderKey] as string} />)        
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        const val = array[i] as string;
         res.push(<option key={i}>{val}</option>)        
      }
    }
     return <>{res}</>;
  }



  const tSelect = (
    <div className="input-field-radio-select">
      <span className="input-label" >{label}</span>
      <div className="input-field-radio-select-child-wrapper">
        <select className='input-field-select' name={name} onChange={(e) =>onChange && onChange(e)} >
          <option value={""}>--select--</option>
          {
            handleOptions(values, renderKey, valueKey)
          }
        </select>
          </div>
    </div>
  )


  switch (typeRender) {
    case "renderInput": return tInputField;
    case "renderRadio": return tRadioSelect;
    case "renderSelect": return tSelect;
    case "renderTileSelect": return tileSelect;
    default: return <></>
  }


}

