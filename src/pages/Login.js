import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
function Login() {
const navigate=useNavigate()
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const toastoption={
    position:"bottom-right",
    autoClose:2000,
    draggable:true,
    theme:"dark"
  }
  useEffect(()=>{
if(localStorage.getItem('chat-app-user'))
navigate("/")
  },[])
  const submit=async (e)=>{

    e.preventDefault()
    
    if(handlevalidation()){
   

      
    const data=  axios.post("/login",
        {
        
        username,
        password
      }
      )
      

     console.log(data);
      if((await data).data.status===false){
        toast.error((await data).data.msg,toastoption)
      }
       if((await data).data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify((await data).data.login))
        navigate("/")
      }
    }
  }
  const handlevalidation=()=>{
    
  
     if (username.length ===""){
      toast.error("Username and Password is required",toastoption)
      return false
    }
    else if (password===""){
      toast.error("Username and Password is required",toastoption)
      return false
    }
   
    return true
  }

  return (
    
    <div className='register'>
      <div className="form">
        
        <form onSubmit={(e)=>{submit(e)}}>
        <h1>Yin-De</h1>
          <input type="text"
            placeholder='Username'
            name='username'
            min="3"
            onChange={(e)=>setusername(e.target.value)}
          />
       
       
          <input type="password"
            placeholder='Password'
            name='password'
            onChange={(e)=>setpassword(e.target.value)}
          />
        
          <button type="submit">Login User</button>
          <span>Don't have an account ? <Link to='/register' className='span'>register</Link></span>
        </form>
      </div>
      <ToastContainer  />
    </div>
    
    
  )
}

export default Login
