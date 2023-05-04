import React from 'react'
import '../css/style.css'
import { NavLink, link } from 'react-router-dom'

const Login = () => {
  return (
    <>
    <div className='loginclass'>


         <div className="formline">
             <div className="logo"></div>
             <input type="password" className='inputer' placeholder="Access Key" />

    <NavLink to='/statevectors' className='mybutton' >LOGIN</NavLink> 
          </div>


</div>
    </>
  )
}

export default Login