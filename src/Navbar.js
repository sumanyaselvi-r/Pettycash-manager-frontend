import React, { Children, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { SiGoogleanalytics } from "react-icons/si";
import { TbReport } from "react-icons/tb";
import { SiMoneygram } from "react-icons/si";
import { FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import { FaBars } from "react-icons/fa";

import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    const[isOpen,setisOpen]=useState(false)
    const toggle=()=>setisOpen(!isOpen)


    const menuItem=[{
        path:"/",
        name:"Dashboard",
        icon:<BiSolidDashboard />,
    },
    {
        path:"/transactionlist",
        name:"Transactions",
        icon:<GiTakeMyMoney /> ,
    },
   
    {
        path:"/reports",
        name:"Reports",
        icon:<TbReport /> ,
    },
    
    {
        path:"/Calendar",
        name:"Calendar",
        icon:<FaCalendarAlt />,
    },
    {
        path:"",
        name:"Setting",
        icon:<IoMdSettings />,
    },
    {
        path:"",
        name:"Logout",
        icon:<BiLogOutCircle />,
    },
]


  return (
    <>
        <div className='nav-container'>
            <div style={{width:isOpen? "300px" : "50px"}} className='navbar'>
                <div className='top_section'>
                    <h1 style={{display:isOpen? "block" : "none"}} className='logo'><span><GiCash style={{fontSize:'50px'}}/> PettyPal</span> 
             </h1>
                    <div style={{marginLeft:isOpen? "50px" : "0px"}} className='bar'>
                    <FaBars onClick={toggle} />

                    </div>
                </div>
                <div className='nav-list'>
                {
                    menuItem.map((item,index)=>(
                        <Link to={item.path} key={index} className="link" >
                            <div className='icon'>{item.icon}</div>
                            <div style={{display:isOpen? "block" : "none"}} className="link_text">{item.name}</div><br></br><br></br>
                        </Link>
                        
                    ))
                }
                </div>
            </div>
           
        </div>

    </>
  )
}

export default Navbar