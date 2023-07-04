
import React from 'react';
import { useLocation } from 'react-router-dom';


export const useResetPass=()=>{
    
    const [success,setSuccess]=React.useState(false)
    const location=useLocation()
    const reset_token=new URLSearchParams(location.search).get("token")


    const resetpass = async(password) => {
       
       
        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'reset/?token='+reset_token,{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({password,reset_token})

        }).catch((error)=>console.log(error));
        
        if (!respone.ok)
        {
            console.log("error")
            console.log(respone.json())
        }
        if (respone.ok)
        {
            setSuccess(true)
            console.log(success)

        }
    }
    return{resetpass,success}
}

