import React from 'react'
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
function Header({openSidebar}) {
  return (
    
<header  className='header'>
    <div className='menu-icon'>
    <FaBars  onClick={openSidebar}/>
    </div>
    <div className='header-left'>
       
    </div>
    <div className='header-right'>
    <CgProfile style={{fontSize:'40px'}} />
   
    </div>
</header>
    
  )
}

export default Header