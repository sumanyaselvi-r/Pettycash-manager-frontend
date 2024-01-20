import React, {  useState } from 'react'
import { BiSolidDashboard } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbReport } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import { FaBars } from "react-icons/fa";

import { Link} from 'react-router-dom';

function Navbar() {
    const[isOpen,setisOpen]=useState(false)
    const toggle=()=>setisOpen(!isOpen)
    
    const menuItem=[

        {
        path:"/manager/dashboard",
        name:"Dashboard",
        icon:<BiSolidDashboard />,
    },
    {
        path:"/manager/transactionlist",
        name:"Transactions",
        icon:<GiTakeMyMoney /> ,
    },
   
    {
        path:"/manager/reports",
        name:"Reports",
        icon:<TbReport /> ,
    },
    
    {
        path:"/manager/Calendar",
        name:"Calendar",
        icon:<FaCalendarAlt />,
    },
    
    {
        path:"/manager/logout",
        name:"Logout",
        icon:<BiLogOutCircle />,
    },
]


  return (
    <>
        <div className='nav-container'>
            <div style={{width:isOpen? "300px" : "50px"}} className='navbar'>
                <div className='top_section'>
                    <h1 style={{display:isOpen? "block" : "none"}} className='logo'><span ><GiCash style={{fontSize:'50px',fontWeight:'700px'}}/>DashDime</span> 
             </h1>
                    <div style={{marginLeft:isOpen? "50px" : "0px"}} className='bar'>
                    <FaBars onClick={toggle} />

                    </div>
                </div>
                <div className='nav-list'>
                {
                    menuItem.map((item,index)=>(
                        <Link to={item.path} key={index} className="link"  >
                            <div className='icon'>{item.icon}</div>
                            <div style={{display:isOpen? "block" : "none"}} className="link_text"  onClick={() => setisOpen(false)} >{item.name}</div><br></br><br></br>
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
