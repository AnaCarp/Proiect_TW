import React, { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import Axios from 'axios';

export const Home=() =>{
    const [experienceList, setExperienceList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [allExperiences, setAllExperiences]=useState([])

    useEffect(() => {
        Axios.get('http://localhost:8000/experiences').then((response) => {
            setExperienceList(response.data);
        })
    }, [])


   function signup(){
        window.location.replace('/register');
    }
  
    function login(){
        window.location.replace('/login');
    }

    function search(value){
        let searchedExperiences = experienceList.filter (e => e.vehicleType == value)

        setAllExperiences([...experienceList])
   
        setExperienceList([...searchedExperiences])
  
    }

    function undo(){
      
        setExperienceList([...allExperiences])
       
    }
    return (
        <>
        <div>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" />
                <Button label="Go" onClick={() =>search(searchValue)}/>
                <Button label="Undo" onClick={() =>undo()}/>
            </span>
         
        </div>
        <div>
            <DataTable value={experienceList}>
            <Column header='Author' field='author' />
            <Column header='Start Point' field='startPoint' />
            <Column header='End Point' field='endPoint' />
            <Column header='Vehicle Type' field='vehicleType' />
            <Column header='Departure Hour' field='departureHour' />
            <Column header='Duration' field='duration' />
            <Column header='Agglomeration' field='agglomeration' />
            <Column header='Satisfaction Level' field='satisfactionLevel' />
            <Column header='Observations' field='observations' />
          </DataTable>

          <div>
                <Button label="Login to post experience" onClick={login} icon="pi pi-user" />
            </div>
            <div>
                <Button label="Create acount " onClick={signup} icon="pi pi-user-plus" />

            </div>
          
        </div>
        </>
       
    );
}
export default Home;