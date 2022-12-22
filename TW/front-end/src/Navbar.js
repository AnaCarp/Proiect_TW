

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from 'primereact/button'
// import './Navbar.css'


// import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
// import "primereact/resources/primereact.min.css";                  //core css
// import "primeicons/primeicons.css";      

// const Navbar = ({ children }) => {
//   const [toggleMenu, setToggleMenu] = useState(false);
//   const navigate = useNavigate();
//   const user = localStorage.getItem("user");

//   const handleToggle = () => {
//     console.log(toggleMenu)
//     toggleMenu ? setToggleMenu(false) : setToggleMenu(true);
//   };

//   const handleClickLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handleClick = ()=>{
//     console.log("ok")
//     return(
//         <div className="menu-items" style={{display: { toggleMenu:true ? 'block' : 'none'} }}>
//             <div>
//                 <ul>
//                 <li >
//                     <a href="/home">Home</a>
//                 </li>
//                 <li >
//                     <a href="/my-experiences">My experiences</a>
//                 </li>
//                 <li>
//                     <a href="/profile">Profile</a>
//                 </li>
//                 <li >
//                     <button onClick={handleClickLogout}>Logout</button>
//                 </li>
//                 </ul>
//             </div>
//         </div>);
//   }


//   return (
//     <>  
//     <div className="navbar">
//       <header>
//         <div className="navbar">
//         <Button id="menu_button"icon ="pi pi-list" style={{ fontSize: '50px', color: 'var(--white-500)' }} className="p-button-raised" onClick={()=>[handleToggle()]}/>
//         </div>
//       </header>
//       {/* <div className="menu-items" style={{display: { toggleMenu:true ? 'block' : 'none'} }}> */}
//       <div className="menu-items" style={{display: { toggleMenu:true ? 'block' : 'none'} }}>
//                 <ul>
//                 <li >
//                     <a href="/home">Home</a>
//                 </li>
//                 <li >
//                     <a href="/my-experiences">My experiences</a>
//                 </li>
//                 <li>
//                     <a href="/profile">Profile</a>
//                 </li>
//                 <li >
//                     <button onClick={handleClickLogout}>Logout</button>
//                 </li>
//                 </ul>
      
//         </div>
//       {children}
//     </div>
//     </>
//    );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from 'primereact/button'
import { useNavigate } from "react-router-dom";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

 const SidebarData = [
    {
      title: 'Home',
      path: '/home',
      cName: 'nav-text'
    },
    {
      title: 'My Experiences',
      path: '/my-experiences',
      cName: 'nav-text'
    },
    {
      title: 'Profile',
      path: '/my-profile',
      cName: 'nav-text'
    }
  ];
  return (
    <>
        <div className='navbar'>
          
          <Button id="menu_button"icon ="pi pi-list" style={{ fontSize: '50px', color: 'var(--white-500)' }} className="p-button-raised" onClick={()=>setSidebar(!sidebar)}/>
         
        </div>
        <div>
        
        </div>
            {
           SidebarData.map((item, index) => {
                {
                    if(sidebar){
                        return (
                            <li id={index} key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                            </li>
                        );
                    }
                    
         
                }
            })
            }
          

    </>
  );
}

export default Navbar;
