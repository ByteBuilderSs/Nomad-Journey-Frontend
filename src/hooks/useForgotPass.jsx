
import React from 'react';


export const useForgotPass=()=>{
    
    const[success,setSuccess]=React.useState(false);

    const forgotPass = async(email) => {

        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'reset-password/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({email})
        }).catch((error)=>console.log(error));

        const json = await respone.json()
        if (!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if (respone.ok)
        {
            setSuccess(true)
        }
    }
    return{forgotPass,success}
}

