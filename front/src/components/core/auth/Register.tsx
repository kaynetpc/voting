import { useState, useEffect } from 'react';
import { TiArrowRightOutline } from 'react-icons/ti';
import Button from '../../../dependencies/button/Button';
import { InputField } from '../../../dependencies/InputFIeld/InputField';
import './Register.css';
import './Login.css';
import { KNT } from '../../../dependencies/js/knt';
import { JHttp } from '../../../dependencies/js/Jpc';
import { baseUrl, MSG, connectionStatus } from '../../service/Constant';
import { IUserData } from '../../service/Reducers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../dependencies/form/Form';

interface Props {
    onSwitch?: (re: string) => void;
}

export const Register = ({ onSwitch }: Props) => {

    const [state, setState] = useState({});
    const [userTypes, setUserTypes] = useState([]);



    const dispatcher = useDispatch();

    let navigate  = useNavigate();


    const fetchUserTypes = () => {
        JHttp.get(`${baseUrl}/user/list/type`, (data: any) => {
            data && setUserTypes(data);
        }, (err: any) => {console.log(err)})
    }

    useEffect(() => {
        fetchUserTypes()
    }, []);

    
  
    const schema = [
    
        {
            name: "userType",
            type: "select",
            values: userTypes,
            control: {
                type: "select",
                renderKey: "name",
                valueKey: "name",
                label: "User Type",
            }
        },
        {
            name: "firstName",
            type: "input",
            control: {
                type: "text",
                label: "First Name",
                placeholder: "Enter First Name"
            }
        },
        {
            name: "lastName",
            type: "input",
            control: {
                type: "text",
                label: "Last Name",
                placeholder: "Enter Last Name"
            }
        },
        {
            name: "gender",
            type: "select",
            values: ["Male", "Female"],
            control: {
                type: "checkbox",
                label: "Gender",
                placeholder: "Gender"
            }
        },
        {
            name: "email",
            type: "input",
            control: {
                type: "text",
                label: "Email",
                placeholder: "Supply Email",
            }
        },
        {
            name: "phoneNumber",
            type: "input",
            control: {
                type: "number",
                label: "Phone Number",
                placeholder: "Phone Number"
            }
        },
        {
            name: "addressOne",
            type: "input",
            control: {
                type: "text",
                label: "Address",
                placeholder: "Address"
            }
        },
        {
            name: "password",
            type: "password",
            control: {
                type: "input",
                label: "Choose A Password",
                placeholder: "Password"
            }
        },
    ]



    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value, e.target);

        setState(pr => ({ ...pr, [name]: value }))
    }

    const switchLogin = () => {
        onSwitch && onSwitch("login")
    }

    const handleRegister = (e: any) => {
        e.preventDefault();
        console.log(state);
        const formData: [{}] = [state];
        KNT.validateField.validate(formData, (res: string) => alert(MSG.fieldRequiredMSG(res)), () => {
            if (window.confirm(MSG.confirmMSG)) {
                JHttp.post(`${baseUrl}/user/reg`, state, (response: any | string) => {

                    handleStatusConnection(response);

                }, (err: any) => console.log(err));
            }
        })

    }
    const handleRegisterNow = (data: any) => {
        console.log(data);
        const formData: [{}] = [data];
        KNT.validateField.validate(formData, (res: string) => alert(MSG.fieldRequiredMSG(res)), () => {
            if (window.confirm(MSG.confirmMSG)) {
                JHttp.post(`${baseUrl}/user/reg`, data, (response: any | string) => {

                    handleStatusConnection(response);

                }, (err: any) => console.log(err));
            }
        })

    }


    const handleStatusConnection = (response: IUserData): void => {
        if(response !== null){
            const status = response.status | 0;
            console.log(status);
            if(status === connectionStatus.connected){
                alert("connected")

                dispatcher({type: "setUserData", data: response})

                sessionStorage.setItem("username", response.username);
                sessionStorage.setItem("user_basic_data", JSON.stringify(response));

                navigate('/app')
            } else
            if(status === connectionStatus.blocked){
                console.log(response.message);
            } else
            if(status === connectionStatus.failed){
                console.log(response.message);
            } else 
            if(status === connectionStatus.incorrect){
                alert(response.message);
            } else
            if(status === connectionStatus.not_exist){
                alert(response.message);
            }
        }
    }


    const submitButtonRender = (data: any) => {
        return (
            <div className="login-reg-btn-wrapper">
                <Button icon={<TiArrowRightOutline />} label="REGISTER" onClick={() => handleRegisterNow(data)} />
                <span onClick={switchLogin} className="clickable-btn-span" >Already Have a login?</span>
            </div>
        )
    }


    return (
        <div className="reg-frame">
            <div>
                <div className="reg-login-title">Create An Account</div>
                {
                    // schema.map((x, i) => (
                    //     x.type === "select" ?
                    //         <InputField typeRender="renderRadio" type={x.type} values={x.values} name={x.name} label={x.control.label} placeholder={x.control.placeholder} onChange={handleChange} />
                    //         :
                    //         <InputField name={x.name} label={x.control.label} type={x.type} placeholder={x.control.placeholder} onChange={handleChange} />
                    // ))
                }
                <Form schema={schema} onSubmit={handleRegister} label="Submit Request" userButton={(e) => submitButtonRender(e)}  onChange={handleChange} />        
            </div>
        </div>
    )
}


