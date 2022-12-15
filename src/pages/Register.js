import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
function Register() {
const navigate=useNavigate()
  const [username,setusername]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [cpassword,setcpassword]=useState("")
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
   

      
    const data=  axios.post("/register",
        {
        email,
        username,
        password
      }
      )
      console.log(data);
      // console.log((await data).data);

     
      if((await data).data.status===false){
        toast.error((await data).data.msg,toastoption)
      }
      if((await data).data.status===true){
        await localStorage.setItem('chat-app-user',JSON.stringify((await data).data.users))
        navigate("/")
      }
    }
  }
  const handlevalidation=()=>{
    
    if(password !== cpassword){
      toast.error("password and confirm password should be the same ",toastoption)
      return false
    }
    else if(username.length <4){
      toast.error("Username should be greater than 4 character",toastoption)
      return false
    }
    else if(password.length <6){
      toast.error("Password should be equal or greater than 6 character",toastoption)
      return false
    }
    else if(email===""){
      toast.error("Email is required",toastoption)
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
            onChange={(e)=>setusername(e.target.value)}
          />
          <input type="email"
            placeholder='Email'
            name='email'
            onChange={(e)=>setemail(e.target.value)}
          />
       
          <input type="password"
            placeholder='Password'
            name='password'
            onChange={(e)=>setpassword(e.target.value)}
          />
          <input type="password"
            placeholder='Confirm Password'
            name='Confirmpassword'
            onChange={(e)=>setcpassword(e.target.value)}
          />
          <button type="submit">Create User</button>
          <span>already have an account ? <Link to='/login' className='span'>login</Link></span>
        </form>
      </div>
      <ToastContainer  />
    </div>
    
    
  )
}

export default Register
