import React from 'react'
import {useNavigate} from "react-router-dom"
import {BiPowerOff} from "react-icons/bi"
function Logout() {
    const navigate=useNavigate()
    const handleclick=async()=>{
        localStorage.clear()
        navigate("/login")
    }
  return (
    <div className='logout' onClick={handleclick}>
        <BiPowerOff/>
      logout
    </div>
  )
}

export default Logout
