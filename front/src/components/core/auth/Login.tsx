import React, { useEffect, useState } from 'react';
import Button from '../../../dependencies/button/Button';
import './Login.css';
import {TiArrowRightOutline} from 'react-icons/ti'
import { useNavigate } from 'react-router-dom';
import { JHttp } from '../../../dependencies/js/Jpc';
import { KNT } from '../../../dependencies/js/knt';
import { Register } from './Register';
import { useDispatch } from 'react-redux';
import { adminKey, baseUrl, connectionStatus } from '../../service/Constant';
// import { IReducersState } from '../../service/Reducers';

interface Props {
    currentTitle?: (title: string) => void;
}

export const Login = ({currentTitle}: Props) => {
    
    const dispatcher = useDispatch();
    // const title: string = useSelector<IReducersState>(state => state.title) as string;

    const [current, setCurrent] = useState("login")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState("");
    const [errorAlert, setErrorAlert] = useState(false);

    let navigate  = useNavigate();

    
    currentTitle && currentTitle(current);
    
    sessionStorage.setItem("username", "");


    const fetchAdminDetails = () => {
        JHttp.get(`${baseUrl}/admin/get/details`, (data: any) => {
            const temp = JSON.stringify(KNT.array.removeByKeys([data], ["rolesId"])[0]);
            localStorage.setItem(adminKey, temp)
        })
    }

    useEffect(() => {
        fetchAdminDetails()
    }, [])



    const authLogin = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e && e.preventDefault();
        const formData = {username: username, passkey: password};
        KNT.validateField.validate([formData], (keys: string) => {alert(KNT.string.titleCase(keys)+ " is Required")}, () => {
            JHttp.post(`${baseUrl}/auth/login`, formData, (response: any) => {
                if(response !== null){
                    const status = response.status | 0;
                    if(status === connectionStatus.connected){
                        alert("connected")

                        dispatcher({type: "setUserData", data: response})

                        sessionStorage.setItem("username", response.username);
                        sessionStorage.setItem("user_basic_data", JSON.stringify(response));

                        navigate('/app')
                    } else
                    if(status === connectionStatus.blocked){
                        setMsg(response.message);
                        setErrorAlert(true)
                    } else
                    if(status === connectionStatus.failed){
                        setMsg(response.message);
                        setErrorAlert(true)
                    } else 
                    if(status === connectionStatus.incorrect){
                        alert(response.message)
                        setMsg(response.message);
                        setErrorAlert(true)
                    } else
                    if(status === connectionStatus.not_exist){
                        alert(response.message)
                        setMsg(response.message);
                        setErrorAlert(true)
                    }
                }
                
            }, (err: any) => {
                console.error(err);
            });
        } );

    }

    const switchReg = (str: string) => {
        setCurrent(str)
        dispatcher({type: "setTitle", data: str});
    }

    window.onkeydown = (ev: KeyboardEvent) => {
        if(ev.key === "Enter"){
            KNT.validateField.validate([{userName: username, password: password}], undefined, () => {
                authLogin()
            })
        }
    }

    return (
        <div className="login-frame">
            {
                current ===  "login"?
                <div className="login">
                        <div className="reg-login-title">Authentication</div>
                        <div className={`login-input-frame ${errorAlert === true? "login-input-frame-error": ""}`}>
                            <div className="login-input">
                                <input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value) } placeholder="Enter Username" type="text" />
                            </div>
                            <div className="login-input">
                                <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } placeholder="Enter Password"  type="password" />
                            </div>
                            <span>{errorAlert && msg}</span>
                        </div>
                        <div className="login-reg-btn-wrapper">
                            <Button icon={<TiArrowRightOutline  />} label="LOGIN"   onClick={authLogin} />
                            <span onClick={() => switchReg("register")} className="clickable-btn-span" >Register</span>
                        </div>
                </div>
                : 
                <Register onSwitch={(re) => switchReg(re)}  />
        }
         </div>
    )
}
