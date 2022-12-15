import React,{useState,useEffect} from 'react'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useNavigate} from "react-router-dom" 
import {Buffer} from "buffer"
import FullHeight from "react-full-height";
import load from "./loader.gif"


export default function SetAvatar() {
    const navigate=useNavigate()
    const [avatar , setavatar]=useState([])
    const [loading , setloading]=useState(true)
    const [selectedavatar,setselectedavatar]=useState(undefined)
    const user= JSON.parse(localStorage.getItem("chat-app-user"))  
    console.log(user);
    const data= axios.post(`/setavatar/${user._id}`,{
      image:avatar[selectedavatar]
    })
    console.log(data);
    const toastoption={
        position:"bottom-right",
        autoClose:2000,
        draggable:true,
        theme:"dark"
      }
      useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login")
          }
      },[])
      const api = `https://api.multiavatar.com`;
    const setprofile=async()=>{
        if(selectedavatar===undefined){
            toast.error("please select an avatar",toastoption)
        }
        else{
          const user=await JSON.parse(localStorage.getItem("chat-app-user"))  
          console.log(user);
          const data=await axios.post(`/setavatar/${user._id}`,{
            image:avatar[selectedavatar]
          })
          console.log(data);
          if((await data).data.isSet){
            user.isAvatarImageSet=true
            user.avatarImage=(await data).data.image
            localStorage.setItem("chat-app-user",JSON.stringify(user))
            navigate("/")
          }else{
            toast.error("Error setting avatar. Please try again",toastoption)
          }
        }
    }
    const getuser= async()=>{
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
        console.log(image);
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setavatar(data);
        setloading(false);
    }
    useEffect( () => {
       getuser()
        
      }, []);
  return (
    <FullHeight className='avatara'>
        {
            loading ? <div>
                <img src={load} alt="" className='load' />
            </div>:
            <div >
    <h1>Pick an avatar as your profile picture</h1>
      <div className='flex'>
        {
            avatar.map((ava,ind)=>{
    return(
        <div className={`avatars ${selectedavatar ===ind ? "selected" : ""}`} key={ind}>
            <div className='img'>
            <img src={`data:image/svg+xml;base64,${ava}`} alt="avatar" onClick={()=>setselectedavatar(ind)}
        />
            </div>
     
        </div>
        
        
    )
        
      

            })
        }
      </div>
      <ToastContainer/>
     <div className="btn">
              <button onClick={setprofile}>SET AS PROFILE PICTURE</button>

     </div>
       </div>
        }
         
    </FullHeight>
   
  
   
  )
}
