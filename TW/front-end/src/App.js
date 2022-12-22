import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Main from './pages/Main'
import Profile from './pages/Profile'

function App() {
  return (
    <div >
     <Router>
     <Routes>
            <Route path='/register' exact element={<Register/>}></Route>
            <Route path='/login' exact element={<Login/>}></Route>
            <Route path='/home' exact element={<Home/>}></Route> 
            <Route path='/my-experiences' exact element={<Main/>}></Route> 
            <Route path='/my-profile' exact element={<Profile/>}></Route> 
          </Routes>
     </Router>
      
        
    
    </div>
  );
}

export default App;
