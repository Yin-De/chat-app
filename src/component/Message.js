import React from 'react'

function Message({msg,scroll,ids}) {
  return (
    <div className='message' >
   {
    msg.map((msgs)=>{
        console.log(msgs);
        return(
            <div >
                 <div className={`messages ${msgs.fromSelf ? "sended" : "received"}`} ref={scroll} key={ids} >
                <div className="content">
                    <p>
                        {msgs.message}
                    </p>
                </div>
                 </div>
            </div>
        )
    })
   }
    </div>
  )
}

export default Message
