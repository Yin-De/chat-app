import React,{useState,useEffect} from 'react'
import logo from "./robot.gif"
import {useMediaQuery} from "@react-hook/media-query"
import { useNavigate} from "react-router-dom"
import { useGlobalContext } from '../context'

function Contact({contact,currentuser,changechat}) {
    const {currentusers} = useGlobalContext()
    console.log(currentusers);
    const match = useMediaQuery('only screen and (min-width:600px)')
    const navigate=useNavigate()
    const [currentusername,setcurrentusername]=useState()
    const [currentuserimage,setcurrentuserimage]=useState()
    const [currentselected,setcurrentselected]=useState(undefined)
    useEffect(()=>{
        if(currentuser){
            setcurrentuserimage(currentuser.avatarImage)
            setcurrentusername(currentuser.username)
        }

    },[currentuser])
    const changecurrentchat=async(ind,cont)=>{
        
        if(!match){
           await changechat(cont)
            setcurrentselected(ind)
            
            navigate("/chat")
          }
          else{
               setcurrentselected(ind)
        changechat(cont)
          }
    }
    console.log(contact);
  return (
    <div>
      {
        currentuserimage && currentusername &&(
            <div className="container">
            
                <div className="brand">
                    <img src={logo} alt="" />
                    <h3>Yin-De</h3>
                </div>
                <div className="contacts">
                    {
                        contact.map((con,ind)=>{

                            return(
                                <div className={`contact ${ind === currentselected ? "select":""}`} key={ind} onClick={()=>changecurrentchat(ind,con)}>
                                    <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${con.avatarImage}`} alt="" />
                                    </div>
                                    <div className="username">
                                        <h3>{con.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                    <div className="current-user">
                    <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${currentuserimage}`} alt="" />
                                    </div>
                                    <div className="username">
                                        <h2>{currentusername}</h2>
                                    </div>
                    </div>
                    </div>
        )
      }
    </div>
  )
}

export default Contact
