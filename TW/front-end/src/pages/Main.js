import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import {Calendar} from 'primereact/calendar'
import { Rating } from 'primereact/rating';
import { TreeSelect } from 'primereact/treeselect';
import Navbar from '../Navbar';
import Login from './Login';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import './Main.css'
import Axios from 'axios';


export const Home=() =>{
    const [experienceList, setExperienceList] = useState([]);
    const [dialogShow, setDialogShow]=useState(false)
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");



    let emptyExperience = {
        author: '',
        startPoint: '',
        endPoint:'',
        vehicleType: '',
        departureHour:'',
        duration:'',
        agglomeration:'',
        observations:'',
        satisfactionLevel:''
    };

    const[experience, setExperience]=useState(emptyExperience)
    const [isNewExperience, setIsNewExperience]=useState(false)
    const [isAddDialogShown, setIsAddDialogShown]=useState(false)
    const[message, setMessage]=useState('')
    const[showCustomDialog, setShowCustomDialog]=useState(false)
    const[showDeleteDialog, setShowDeleteDialog]=useState(false)
    const [hour, setHour]=useState("")
    const [satisfactionLevel, setSatisfactionLevel]=useState("")

    useEffect(() => {
        
         Axios.get(`http://localhost:8000/users/${userId}/experiences`).then((response) => {
            setExperienceList(response.data);
        })
        
      }, [isAddDialogShown]);

  
    const deleteExperience = async (rowData) => {
    
        setMessage("Deleted")
        // setShowDeleteDialog(true);
        setShowCustomDialog(true)
       
        await Axios.delete(`http://localhost:8000/users/${userId}/experiences/${rowData.id}`,rowData.id);
  
       
        await Axios.get(`http://localhost:8000/users/${userId}/experiences`).then((response) => {
                setExperienceList(response.data);
            })
    }
     const editExperience = (rowData) => {
        let experienceCopy = Object.assign({}, rowData)

        setExperience(experienceCopy);
        setSatisfactionLevel(experienceCopy.satisfactionLevel)
        setIsNewExperience(false);
        setIsAddDialogShown(true);

      }

     const saveExperience=async () =>{
        setDialogShow(false)
       
        if(isNewExperience){
            //adaugare in bd => axios.post
            Axios.post(`http://localhost:8000/users/${userId}/experiences`,experience,{
                headers: {
                    "Content-Type": "application/json"
                }
                })

                setDialogShow(false)
                hideDialog(true)

                //pentru dialog custonm: setare mesaj si stare ca true
                setMessage("Experience added!")
                setShowCustomDialog(true)

        }else{
            console.log(isNewExperience)
            //actualizare in bd => axios.put 
           await Axios.put(`http://localhost:8000/experiences`,experience);

           setDialogShow(false)
           hideDialog(true)

             //pentru dialog custonm: setare mesaj si stare ca true
           setMessage("Experience updated!")
           setShowCustomDialog(true)
        }

        await Axios.get(`http://localhost:8000/users/${userId}/experiences`).then((response) => {
            setExperienceList(response.data);
        })
        //axios.post/put experienta in functie daca isNewExperience
    }
    const addNew = () => {
        setExperience(emptyExperience)
        setSatisfactionLevel(0)
        setIsNewExperience(true)
        setIsAddDialogShown(true)
   
    }


    const opsTemplate = (rowData) => {
        return <>
            {/* delete & edit experience */}
            <Button icon="pi pi-times" className="p-button-danger" onClick={() => deleteExperience(rowData)}  />
            <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => editExperience(rowData)} />
        </>
      }

 
      const tableFooter = <div>
      <span>
        <Button label="Add" onClick={()=>addNew()} icon="pi pi-plus" />
      
      </span>
    </div>

   const addDialogFooter = <div>
      <Button  label="Save" icon="pi pi-save" onClick={() => saveExperience()} />
    </div>

    const hideDialog = () => {
    setIsAddDialogShown(false)
    }

    const updateProperty = (property, value) => {
        experience[property] = value
        setExperience(experience)
     }

     const getHeaderForDialog =()=>{
        if(isNewExperience)
             return "Add a experience"
        else
            return "Edit current experience"
     }


        const deleteDialogFooter  = <div>
            <div><Button id="button_yes" label="Yes" icon="pi pi-check" onClick={()=>deleteExperience()} /></div>
            <div><Button label="No" icon="pi pi-times" onClick={()=>setShowDeleteDialog(false)} /></div>
        </div>


    return (
        <>
        <div>
            <Navbar></Navbar>
        </div>
        <div>
            <DataTable value={experienceList} footer={tableFooter}>
            <Column header='Author' field='author' />
            <Column header='Start Point' field='startPoint' />
            <Column header='End Point' field='endPoint' />
            <Column header='Vehicle Type' field='vehicleType' />
            <Column header='Departure Hour' field='departureHour' />
            <Column header='Duration' field='duration' />
            <Column header='Agglomeration' field='agglomeration' />
            <Column header='Satisfaction Level' field='satisfactionLevel' />
            <Column header='Observations' field='observations' />
            <Column header='Options' body={opsTemplate} />
          </DataTable>

        </div>

        <div>
        {
          isAddDialogShown ?
            <Dialog  
                      visible={isAddDialogShown} 
                      header={getHeaderForDialog}
                      footer={addDialogFooter}
                      onHide={hideDialog}>
                        <div className='form-experience' >
                            <InputText  className='input-text' onChange={(e) => updateProperty('author', e.target.value)} defaultValue={experience.author} name="author" placeholder="Author" />
                            
                            <div className='points'>
                                <InputText onChange={(e) => updateProperty('startPoint', e.target.value)} defaultValue={experience.startPoint} name="startPoint" placeholder="Start Point" />
                                <InputText onChange={(e) => updateProperty('endPoint', e.target.value)} defaultValue={experience.endPoint} name="endPoint" placeholder="End Point" />
                            </div>

                            
                            <InputText className='input-text' onChange={(e) => updateProperty('vehicleType', e.target.value)} defaultValue={experience.vehicleType} name="vehicleType" placeholder="Vehicle Type" />
                           
                           <div className='points'>
                               <Calendar onChange={(e) =>[ updateProperty('departureHour', String(e.target.value).substring(16,21)), setHour(String(e.target.value).substring(16,21)), console.log(experience.departureHour)]} defaultValue={experience.departureHour} name="departureHour" placeholder="Departure Hour" timeOnly='true' hourFormat="24"showTime='true' />
                               <InputText onChange={(e) => updateProperty('duration', e.target.value)} defaultValue={experience.duration} name="duration" placeholder="Duration" />
                           </div>
                   
                            <InputText className='input-text' onChange={(e) => updateProperty('agglomeration', e.target.value)} defaultValue={experience.agglomeration} name="agglomeration" placeholder="Agglomeration" />
                    
                            <InputTextarea className='input-text' onChange={(e) => updateProperty('observations', e.target.value)} defaultValue={experience.observations} name="observations" placeholder="Observations" />
                     
                            <h5>Satistaction level {satisfactionLevel}</h5>
                            <Rating onChange={(e) =>[updateProperty('satisfactionLevel', e.target.value), setSatisfactionLevel(e.target.value)] } defaultValue={experience.satisfactionLevel} value={satisfactionLevel} />
                       
                    
                        </div>
                 </Dialog>
          :
            null
        
        }
                {/* dialog pentru mesaj modificare/adaugare experienta */}
                <Dialog visible={showCustomDialog}  onHide={() => setShowCustomDialog(false)} position="top" breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5></h5>

                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                       <b>{message}</b> 
                    </p>
                </Dialog>

                <Dialog visible={showDeleteDialog} footer={deleteDialogFooter} onHide={() => setShowDeleteDialog(false)} position="top" breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
              
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                       <b>{message}</b> 
                    </p>
                </Dialog>

                
     

        </div>

        </>
       
    );
}
export default Home;