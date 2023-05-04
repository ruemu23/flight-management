import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import '../css/style.css'
import {MdOutlineMenu} from 'react-icons/md'
import { useState } from 'react'


const Layout = () => {
  const [isSidemenu, setisSidemenu] = useState(false);

  const handleMenu = () => {
    setisSidemenu(!isSidemenu);
  };
  return (
    <>
   <div className='wrapper'>
    <div className='header'>
      <div></div>
      <div className='header1'> Open Sky Network </div>
      <div className='hiders header2' onClick={handleMenu}><MdOutlineMenu /></div>
    </div>
    <div className='mybody'>
      <SideMenu isSidemenu={isSidemenu}  />
        <div className='mycontent'><Outlet /></div>
    </div>
   </div>
    
</>
  )
}

export default Layout