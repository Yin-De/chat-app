import React from 'react'
import logo from "./robot.gif"

function Welcome({currentuser}) {
  
    if(currentuser===undefined){
return ""
    }
    else{
        return(
                  <div className='welcome'>
   <img src={logo} alt="" />
   <h1>Welcome <span>{currentuser.username}!</span></h1>
   <h3>Please select a chat to Start Messaging. </h3>
    </div>
        )
   
    }
   

}

export default Welcome
