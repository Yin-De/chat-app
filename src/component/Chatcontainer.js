import React,{useEffect,useRef} from 'react'
import Chatinput from './Chatinput'
import Logout from './Logout'
import Message from './Message'
import axios from 'axios'
import {v4 as uuidv4} from "uuid"
import { useGlobalContext } from '../context'
import {useNavigate} from "react-router-dom"

function Chatcontainer() {
  const navigate =useNavigate()
  const {currentusers,currentchat,arrivemsg,msgs,setmsg} = useGlobalContext()
useEffect(()=>{
    if(currentchat===undefined){
      navigate("/")
    }
    else if(currentusers===undefined){
      navigate("/")
    }
},[])
useEffect(()=>{
  if(!localStorage.getItem('chat-app-user')){
      navigate("/login")
    }
},[])

  const scrollref=useRef()
const get=async()=>{
  if(currentchat){
const res=await axios.post("/getmsg",{
  from:currentusers._id,
  to:currentchat._id
})
setmsg(res.data)
  }

}
  useEffect(()=>{
get()
  },[currentchat])
  useEffect(()=>{
    arrivemsg && setmsg((prev)=>[...prev,arrivemsg])
  },[arrivemsg])
  useEffect(()=>{
    scrollref.current?.scrollIntoView({behaviour:"smooth"})
  },[msgs])
  console.log(currentusers);
  if(currentusers===undefined){
    return(
      <div>
        <h1>hello</h1>
      </div>
    )
  }
  else{
    return(
      <div className="single-container">

     
        <div className='single-chat'>
        <div className="user-detail">
            <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentchat.avatarImage}`} alt="" />
          
            </div>
            <div className="username">
                <h3>{currentchat.username}</h3>
              
            </div>
        </div>
        <Logout/>
    </div>
    
    <Message msg={msgs} scroll={scrollref} ids={uuidv4()}/>
    <div className="chat-input"> <Chatinput  /></div>
    </div>
    )
  }
   
  
}

export default Chatcontainer
