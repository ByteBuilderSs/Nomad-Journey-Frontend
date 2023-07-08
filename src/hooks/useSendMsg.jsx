import React from 'react'

export const useSendMsg=()=>{
    
    const [msg,setMsg]=React.useState("")
    const sendMsg = async(message,sender,receiver) => {
        
        const usernameS=JSON.parse(localStorage.getItem('tokens')).username
        const access=JSON.parse(localStorage.getItem('tokens')).access

        const respone= await fetch(process.env.REACT_APP_API_TICKET+'send_messages/'+usernameS+'/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`},
            body :JSON.stringify({message,sender,receiver})
        }).catch((error)=>console.log(error));
        
        const json = await respone.json()
        if (!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if (respone.ok)
        {
         setMsg(message)   
        }
    }
    return{sendMsg,msg}
}

