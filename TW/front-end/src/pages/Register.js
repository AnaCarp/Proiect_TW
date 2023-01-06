
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './Register.css'
import Axios from 'axios';
import registerLogo from "../images/signup.png";

//!!! tb importate altfel nu se vad calumea
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

export const Register = () => {
 
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            city:'',
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.firstName) {
                errors.firstName = 'First name is required.';
            }

            if (!data.lastName) {
                errors.lastName = 'Last name is required.';
            }

            if (!data.username) {
                errors.username = 'Username is required.';
            }
            if (!data.password) {
                errors.password = 'Password is required.';
            }
            if (!data.city) {
                errors.city = 'City is required.';
            }

            if (!data.accept) {
                errors.accept = 'You need to agree to the terms and conditions.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (firstName) => !!(formik.touched[firstName] && formik.errors[firstName]);
    const getFormErrorMessage = (firstName) => {
        return isFormFieldValid(firstName) && <small className="p-error">{formik.errors[firstName]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

      const addToDB =async function(){
        var user={
            firstName:"",
            lastName:"",
            username:"",
            password:"",
            city:""
        };
        user.firstName = formik.values.firstName
        user.lastName=formik.values.lastName
        user.username=formik.values.username
        user.password=formik.values.password
        user.city=formik.values.city
      
        await Axios.post('http://localhost:8000/users/signup', user).then((res) => { 
            console.log(res);
        })
    }
    return (
        <>
          <div className='main-container'>
            <div className="form-register">
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                <h5>Registration Successful!</h5>

                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                    Your account is registered under username <b>{formData.username}</b> 
                </p>
        </Dialog>
            <div className="card">
                <h5 id="register">Register</h5>
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
                            <InputText id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('firstName') })} />
                            <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid('firstName') })}>First name</label>
                        </span>
                        {getFormErrorMessage('firstName')}
                    </div>

                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('lastName') })} />
                            <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid('lastName') })}>Last name</label>
                        </span>
                        {getFormErrorMessage('lastName')}
                    </div>


                    <div className="field">
                        <span className="p-float-label">
                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="city" name="city" value={formik.values.city} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                            <label htmlFor="city" className={classNames({ 'p-error': isFormFieldValid('city') })}>City</label>
                        </span>
                        {getFormErrorMessage('city')}
                    </div>
                
                    <div>
                        <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                        <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                    </div>

                    <div className="field">
                    <Button id="buttonSubmit" type="submit" label="Submit"  onClick={addToDB}/>
                    </div >
                
                </form>
            </div>
            </div>

            <img id="registerLogo" src={registerLogo} alt="register logo" />
        </div>

        </>
      
  
    );

}
export default Register;