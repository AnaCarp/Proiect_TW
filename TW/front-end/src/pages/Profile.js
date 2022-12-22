import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import './Register.css'
import Axios from 'axios';


export const Profile=() =>{
   
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [user, setUser]=useState("")
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        
        Axios.get(`http://localhost:8000/users/${userId}`).then((response) => {
           setUser(response.data);
       })
       
     }, []);


    const updateInfo = async ()=>{
        var userToUpdate= user;

        if(formik.values.firstName!==user.firstName)
            userToUpdate.firstName = formik.values.firstName

        if(formik.values.lastName!==user.lastName)
            userToUpdate.lastName = formik.values.lastName
     
        if(formik.values.username!==user.username)
            userToUpdate.username = formik.values.username

        if(formik.values.city!==user.city)
            userToUpdate.city = formik.values.city
        
        if(formik.values.password!='')
            userToUpdate.password = formik.values.password;
        
        await Axios.put(`http://localhost:8000/users/${userId}`, user).then((res) => { 
            console.log(res);
        })
        setShowMessage(true);
    }

     const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            city:''
        },
        validate: (data) => {
            data=user;
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
            if (!data.city) {
                errors.city = 'City is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
           
        }
    });

    const isFormFieldValid = (firstName) => !!(formik.touched[firstName] && formik.errors[firstName]);
    const getFormErrorMessage = (firstName) => {
        return isFormFieldValid(firstName) && <small className="p-error">{formik.errors[firstName]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a new password</h6>;
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


    return (
        <>
          <div className="form">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Update Successful!</h5>

                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account info has been updated. 
                    </p>
            </Dialog>
                <div className="card">
                    <h5 >Account info</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                             <span className="p-float-label">
                                <InputText id="username" name="username" defaultValue={user.username} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username</label>
                        
                            </span>
                            {getFormErrorMessage('username')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="firstName" name="firstName" defaultValue={user.firstName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('firstName') })} />
                                <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid('firstName') })}>First name</label>
                            </span>
                            {getFormErrorMessage('firstName')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="lastName" name="lastName" defaultValue={user.lastName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('lastName') })} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid('lastName') })}>Last name</label>
                            </span>
                            {getFormErrorMessage('lastName')}
                        </div>

        
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" defaultValue={""} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Update Password</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                       
                        <div className="field">
                             <span className="p-float-label">
                                <InputText id="city" name="city" defaultValue={user.city}onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="city" className={classNames({ 'p-error': isFormFieldValid('city') })}>City</label>
                            </span>
                            {getFormErrorMessage('city')}
                        </div>
                       
                        
                        <div className="field">
                        <Button id="buttonSubmit" type="submit" label="Modify your info" onClick={()=>updateInfo()}/>
                        </div >
                    
                    </form>
                </div>
            </div>
        </>
       
    );
}
export default Profile;