
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './Login.css'
import Axios from 'axios';
import Main from './Main'
import loginLogo from "../images/login.png";

import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

export const Login = () => {
 
    const [showSuccesMessage, setSuccesShowMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [id, setId]=useState(0)
    const [error, setError]=useState({})
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'Username is required.';
            }
            if (!data.password) {
                errors.password = 'Password is required.';
            }
            return errors;
        },
        onSubmit: async (data) => {
            // formik.resetForm();
            await Axios.post('http://localhost:8000/users/login', {username:data.username, password:data.password}, {
                headers: {
                    "Content-Type": "application/json"
                }
                }).then((res) => { 
             
                   if(res.data.message !== 'Succesfuly logged in!')
                    {
                      
                        setError(res.data.message)
                        setShowErrorMessage(true)}
                    else{
                    
                        var userId = res.data.userId
                        setSuccesShowMessage(true)

                        localStorage.setItem("userId", userId);
                        navigate("/my-experiences");

                        return(
                            <div>
                                 <Main id={userId} ></Main>
                                { window.location.replace('/my-experiences')}
                             </div>
                        );
                    }
                        
            })

        }
    });


    

    const isFormFieldValid = (firstName) => !!(formik.touched[firstName] && formik.errors[firstName]);
    const getFormErrorMessage = (firstName) => {
        return isFormFieldValid(firstName) && <small className="p-error">{formik.errors[firstName]}</small>;
    };
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => [setShowErrorMessage(false), setSuccesShowMessage(false)]} /></div>;
   
    return (
        <>
        <div className='main-container'>
            <div className="form">
                    <div className="card">
                    <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <i className="pi pi-ban" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                        <h5>Cannot log in!</h5>

                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            Motive: <b>{error}</b> 
                        </p>
                    </Dialog>

                    <Dialog visible={showSuccesMessage} onHide={() => setSuccesShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5>Login Successful!</h5>

                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            You are now logged in <b>{formData.username}</b> 
                        </p>
                    </Dialog>

                        <h5>Login</h5>
                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                    <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username</label>
                                </span>
                                {getFormErrorMessage('username')}
                            </div>

            
                            <div className="field">
                                <span className="p-float-label">
                                    <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                        className={classNames({ 'p-invalid': isFormFieldValid('password') })}/>
                                    <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                        

                            <div className="field">
                            <Button id="buttonSubmit" type="submit" label="Submit" />
                            </div >
                        

                        </form>
            
                    </div>
    
            </div>

            <img id="loginLogo" src={loginLogo} alt="login logo" />
        </div>
       
        </>
 
            
  
    );

}
export default Login;