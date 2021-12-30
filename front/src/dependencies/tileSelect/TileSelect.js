import React, { useEffect, useState } from "react";
import { KNT } from "../js/knt";
import "./TileSelect.css";

function TileSelect({onSelect, data = [], name, prevData = [], renderKey="", valueKey="", all = false, count = 0, countFunc = () => {}}) {
  const active = "tile-select-active";
  const inactive = "tile-select-inactive";

  count = data.length;

  const [select, setSelect] = useState([]);
  const [allItem, setAllItem] = useState(false);

  const [baseData, setBaseData] = useState([]);

  const onClick = (e) => {
    const { value, name } = e.target;
    console.log("ROL", name, value, valueKey, renderKey, count, select)
    if(name === "all"){
      if(count !== undefined && !isNaN(count)){
        
        let temp = KNT.array.getValuesArrayByKey(baseData, "value");
        if(temp.length < count){
          setAllItem(!allItem)
          markAll(!allItem, valueKey);
        } else {
          if(countFunc){countFunc()}
        }

      } else {
        setAllItem(!allItem)
        markAll(!allItem, valueKey);
      }
    }else if(select.includes(value)){
        const newData = KNT.array.remove(value, select)
        setSelect(newData);
    } else {
      if(count !== undefined && !isNaN(count)){
        if(select.length < count){
          setSelect(select.concat(value));
        } else {
          if(countFunc){countFunc()}
        }
      } else { 
        setSelect(select.concat(value));
      }
    }
  };


  useEffect(() => {
     if(onSelect !== undefined) {onSelect({target: {name: name? name: "name", value: select}})};
  }, [select]);
  

  useEffect(() => {
      setBaseData(data)

      if(select.length < data.length){
          setAllItem(false);
        } else {
          setAllItem(true);
      }
    }, [data, select]);
    

  
  useEffect(() => {
    if(prevData !== undefined){
        console.log(prevData)
        setSelect([...prevData])
    } else {
        setSelect([])
    }
  }, [])




    const markAll = (checked, valueKey) => {
        let temp = KNT.array.getValuesArrayByKey(baseData, valueKey);
        if(checked){
            setSelect(temp);
        } else {
            setSelect([]);
        }
    }

    const valueChecker = (val, key1 = "value", key2 = "name") => {
      if(typeof val === "string") {
        return val;
      } else if(typeof val === "object") {
        return val[key1]? val[key1]: val[key2];
      } else return "ok"
    };


    const activeStyle = (item) =>  {
      const val = valueChecker(item, valueKey, renderKey)+"";
      if(select.includes(val)){
        return active;
      } else return inactive
    }

  return (
    <div className="title-select-parent">
        {
            all? 
            <button
            type="button"
            onClick={onClick}
            name="all"
            value={all}
            className={`${allItem? active : inactive}  ${" tile-select"}`}
            >
            all
            </button>
            : null
        }
      {baseData.map((x, i) => (
        <button
          type="button"
          onClick={onClick}
          name={valueChecker(x, valueKey, renderKey)}
          key={i}
          value={valueChecker(x, valueKey, renderKey)}
          className={`${activeStyle(x)}  ${" tile-select"}`}
        >
          {valueChecker(x, renderKey)}
        </button>
      ))}
      
    </div>
  );
}

export default TileSelect;


