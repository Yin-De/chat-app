import React, { useState, useContext, useEffect,useRef } from 'react'
import {io} from "socket.io-client"
import axios from 'axios'

const AppContext = React.createContext()


const AppProvider = ({ children }) => {
  const [currentusers,setcurrentuser]=useState(undefined)
  const [currentchat,setcurrentchat]=useState(undefined)
  const [arrivemsg,setarrivemsg]=useState(null)
  const [msgs,setmsg]=useState([])
console.log(currentchat);
console.log(currentusers);
  const socket=useRef()

  const handlesendmsg=async(msg)=>{ 
    await axios.post("/addmsg",{
      from: currentusers._id,
      to:currentchat._id,
      message:msg,
    })
    socket.current.emit("send-msg",{
      to:currentchat._id,
      from:currentusers._id,
      message:msg,
    })
    const msga=[...msgs];
    msga.push({fromSelf:true,message:msg,})
    setmsg(msga)
  }
  const local =async()=>{
 
     setcurrentuser(await JSON.parse(localStorage.getItem("chat-app-user")))
    
  }
  useEffect(()=>{
    
    if(currentusers){
      
      socket.current.on("msg-receive",(msg)=>{
       
        setarrivemsg({fromSelf:false,message:msg})
      })
    }
  },[currentchat])
  useEffect( ()=>{

    local() 
       
      },[])
      useEffect(()=>{
        if(currentusers){
          socket.current=io("/")
          socket.current.emit("add-user",currentusers._id)
        }
    
      },[currentusers])
 
     
  return (
    <AppContext.Provider
      value={{
        currentusers,
        currentchat,
        setcurrentchat,
        arrivemsg,
        setarrivemsg,
        handlesendmsg,
        msgs,
        setmsg
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
