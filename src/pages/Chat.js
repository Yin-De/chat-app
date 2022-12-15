import React,{useState ,useEffect,useRef} from 'react'
import {useMediaQuery} from "@react-hook/media-query"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import Contact from '../component/Contact'
import Welcome from '../component/Welcome'
import Chatcontainer from '../component/Chatcontainer'
import { useGlobalContext } from '../context'
function Chat() {
const {currentchat,setcurrentchat,socket} = useGlobalContext()

  const match=useMediaQuery('only screen and (max-width:600px)')
  if(match){
  }

  const navigate=useNavigate()

  const [ contact,setcontact]=useState([]) 
  const [currentuser,setcurrentuser]=useState(undefined)
console.log(currentuser);
  const local =async()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login")
    }else{
     setcurrentuser(await JSON.parse(localStorage.getItem("chat-app-user")))
    }
  }

  useEffect( ()=>{

local()
   
  },[])
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
    if(match){
navigate("/")
}
    }

  },[match])
  const current=async()=>{
    if(currentuser){
      if(currentuser.isAvatarImageSet){
        const data=await axios.get(`/allusers/${currentuser._id}`)
        setcontact((await data).data)
      }else{
        navigate("/avatar")
      }
    }
  }
  useEffect(()=>{
    
current()


  },[currentuser])
  const handlechatchange=(chat)=>{
setcurrentchat(chat)

  }
  return (
    <div className='chat-container'>
      <div className='chat'>
    <Contact contact={contact} currentuser={currentuser} changechat={handlechatchange}/>
   
      <div>
         {
         currentchat=== undefined? !match && <Welcome currentuser={currentuser}/>:!match && <Chatcontainer currentuser={currentuser} currentchat={currentchat} socket={socket}/>
      }
      </div>
     
    

   

      </div>
      
    </div>
  )
}

export default Chat
