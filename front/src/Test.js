import React from 'react'
import { JHttp } from './dependencies/js/Jpc';
import { KNT } from './dependencies/js/knt';

const https = require('https');

function Test() {


    const compressString = () => {
        let arr = ["ade", "dea", "bose", "sebo", "sboer", "kay"]
        let res = [];
        let bin = [];
        arr.forEach(el => {
            let cur = el.split("").sort().join();
            if(!bin.includes(cur)){
                bin.push(cur)
                res.push(el);
            }
        });
        return res;
    }

   
const kntHTTP =  {
    get:function(url, callBack, onError){
                console.log("Got here")
        https.get(userNameApi, res => {
                let data = [];
                let mainData = {};
                res.on('data', chuck => {
                    data.push(chuck)
                })
                res.on('end', () => {
                    const user = JSON.parse(Buffer.concat(data).toString());
                    // console.log("User",user)
                    callBack(user);
                })
            }).on('error', err => {
                onError && onError(err)
                console.log('error message ', err.message)
            });     
    }
}


const hh = () => {
    const userNameApi = `https://jsonmock.hackerrank.com/api/article_users?username=${username}`
    const userIdApi = (userId) => `https://jsonmock.hackerrank.com/api/transactions?&userId=${userId}`


    const getUserDetails = () => {
        kntHTTP.get(userNameApi, (res) => {
            const data = res.data | [];
            console.log("USER=> ",res)
            console.log("USER=> ",data)
            
            data.forEach(el => {
                const uId = el.userId;
                getUserTransactionDetails(uId);
            })
            
        }, (err) => {
            console.log(err)
        });        
    }
    
    getUserTransactionDetails = (uId) => {
        kntHTTP.get(userIdApi(uId), (trasactions) => {
            console.log(trasactions.length);
        }, (err) => console.log(err))
    }
    
    getUserDetails()
}




    return (
        <div>
            TESt ON Going
            <button onClick={compressString} type='button'>RUN TEST</button>
        </div>
    )
}

export default Test
