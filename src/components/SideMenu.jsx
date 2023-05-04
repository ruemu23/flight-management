import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/style.css'

const SideMenu = (props) => {

  const isSidemenu = props.isSidemenu;

  return (
    <div className={`${isSidemenu ? "isidemenu" : "sidemenu"}`}>
      <h3 className='hiders' style={{color: 'white'}}>Flight MENU</h3>    
   {/* <NavLink to='/home' className="baller"> HOME </NavLink> */}
   <NavLink to='/statevectors' className="baller"> ALL State Vectors </NavLink>
   <NavLink to='/timeinterval' className="baller"> Flights in Time Interval </NavLink>
   <NavLink to='/byaircraft' className="baller"> Flights by Aircraft  </NavLink>
   <NavLink to='/arrivalairport' className="baller"> Arrivals by Airport </NavLink>
   <NavLink to='/departureairport' className="baller"> Departures by Airport </NavLink>

   {/* <NavLink to='/incoming' className="baller"> Arrivals </NavLink>

   <NavLink to='/outgoing' className="baller"> DEPARTURES </NavLink> */}


   <NavLink to='/' className="baller"> LOG OUT </NavLink>
    
    
    </div>
  )
}

export default SideMenu