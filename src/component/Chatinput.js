import React,{useState} from 'react'
import Picker from "emoji-picker-react"
import {IoMdSend}  from "react-icons/io"
import {BsEmojiSmileFill}  from "react-icons/bs"
import { useGlobalContext } from '../context'

function Chatinput() {
    const {handlesendmsg} = useGlobalContext()

    const [showemoji,setshowemoji]=useState(false)
    const [msg,setmsg]=useState("")
    const handleemoji=()=>{
        setshowemoji(!showemoji)
    }
    const handleemojiclick = (event, emoji) => {
        let message = msg;
        message += event.emoji;
        setmsg(message);
      };
    const sendchat=(e)=>{
        e.preventDefault()

            handlesendmsg(msg)
            setmsg("")
    }
 
  return (
    <div className='chat-input-container'>
      <div className="btn-container">

        <div className="emoji">
            <BsEmojiSmileFill onClick={handleemoji}/>
            {showemoji && <div className="emoji-picker-react" ><Picker   onEmojiClick={handleemojiclick} height={300} width={300} /></div>  }
        </div>
      </div>
      <form className='input-container' onSubmit={(e)=>sendchat(e)}>
    <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>setmsg(e.target.value)} />
    <button className='submit'><IoMdSend/></button>
      </form>
    </div>
  )
}

export default Chatinput
