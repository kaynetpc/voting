import React from 'react'
import { KNT } from '../../../../dependencies/js/knt'
import './Dashboard.css'
import { sortByValueASC } from './Settings';

interface Props {
    data?: Array<object> | any[]
}

export const Dashboard = ({data}: Props) => {
    const colors = (dataLen: number) => makeColors(dataLen);

    
    const percentage = () => {
        let s: number[] = [];
        data && data.forEach((el, index) => s.push(el.votes.length));
        let t = arrayOfNumberToPercentage(s);
        let p: any[] = [];
       data && t.forEach((e, i) => p.push({...data[i], PERCENTAGE_C: e}));
        
        return p;
    }
    return (
        <div>
            <div className='pie-frame'>
                {
                    // KNT.array.
                    percentage().length <= 4 &&  data &&
                    percentage().map((x, i) => <div className='pie-child' style={{width: `${x.PERCENTAGE_C}%`,backgroundColor: colors(data.length)[i]  }}>
                        <div>
                            <span>{x.firstName}</span>
                            <i>{Math.round(x.PERCENTAGE_C)}% count: {x.votes.length}</i>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}


const dataTest = [
    {
        "postName": "Ekiti State Governor",
        "lastName": "Mide",
        "firstName": "Ayo",
        "gender": "Male",
        "image": null,
        "total": 2,
        "votes": [
            {
                "id": 1,
                "votersId": "US-4",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
            {
                "id": 2,
                "votersId": "US-5",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            }
        ]
    },
    {
        "postName": "Ekiti State Governor",
        "lastName": "Mide K",
        "firstName": "Bay",
        "gender": "Male",
        "image": null,
        "total": 2,
        "votes": [
            {
                "id": 1,
                "votersId": "US-4",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
            {
                "id": 2,
                "votersId": "US-5",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            }
        ]
    },
    {
        "postName": "Ekiti State Governor",
        "lastName": "Mide",
        "firstName": "Ayo",
        "gender": "Male",
        "image": null,
        "total": 2,
        "votes": [
            {
                "id": 1,
                "votersId": "US-4",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
            {
                "id": 2,
                "votersId": "US-5",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
            {
                "id": 2,
                "votersId": "US-5",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
        ]
    },
    {
        "postName": "Ekiti State Governor",
        "lastName": "Mide",
        "firstName": "Ayo",
        "gender": "Male",
        "image": null,
        "total": 2,
        "votes": [
            {
                "id": 1,
                "votersId": "US-4",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
            {
                "id": 2,
                "votersId": "US-5",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
            {
                "id": 2,
                "votersId": "US-5",
                "candidateId": "US-3",
                "electionName": "2021 gov election"
            },
        ]
    },
]


const hex = ["A", "B","C","D","E", "F", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];


const arrayOfNumberToPercentage = (arr: Array<number>): Array<number> => {
    return arr.map(x => x / addAll(arr) * 100);
  }

  const  addAll = (array: Array<number>) => {
    return array.reduce((result, entry) => { return result + entry; }, 0) ;
  }

const makeColors = (len = 4): string[] => {
    const checkBin: string[] = [];
    const store: string[] = [];
    for(let index = 0; index < len; index ++){
        const color = "#"+KNT.string.makeId(checkBin, 6, KNT.array.arrayToString(hex,""));
        store.push(color);
    }
    console.log(store);
    return store;
}

