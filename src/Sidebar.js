import React from 'react'
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
import { Link } from 'react-router-dom';

function Sidebar({openSidebarToggle,openSidebar}) {
  return (
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive" :""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand' >
           <span style={{textAlign:'center', fontWeight:'bolder',fontSize:'30px'}}><GiCash style={{fontSize:'50px'}}/> PettyPal</span>  <span className='close-icon' onClick={openSidebar}><IoMdClose /></span>
            </div>
        </div>
        <ul className='sidebar-list'>
         
            <li className='sidebar-list-item'><Link to={"/"} style={{color:'black'}}><BiSolidDashboard /> Dashboard</Link></li><br></br>
              <li className='sidebar-list-item'><Link to={"/transactionlist"} style={{color:'black'}}><GiTakeMyMoney /> Transactions</Link></li><br></br>
              <li className='sidebar-list-item'><Link to={"/analytics"} style={{color:'black'}}><SiGoogleanalytics /> Analytics</Link></li><br></br>
              <li className='sidebar-list-item'><Link to={"/reports"} style={{color:'black'}}><TbReport /> Reports</Link></li><br></br>
              <li className='sidebar-list-item'><Link to={"/budget"} style={{color:'black'}}><SiMoneygram /> Budgets</Link></li><br></br>
              <li className='sidebar-list-item'><Link to={"/calender"} style={{color:'black'}}><FaCalendarAlt /> Calendar</Link></li><br></br>
             
              <li className='sidebar-list-item'><IoMdSettings /> Setting</li><br></br>
              <li className='sidebar-list-item'><BiLogOutCircle /> Logout</li><br></br>
        </ul>
    </aside>
  )
}

export default Sidebar