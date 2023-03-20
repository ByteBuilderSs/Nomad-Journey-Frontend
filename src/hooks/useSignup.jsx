import { useState } from "react";
import {useAuthContext} from './useAuth'


export const useSignup=()=>{
    const[error,setError]=useState('')
    const[isLoading,setLoader]=useState('')
    
    const signup= async(first_name,last_name,email,password,username) =>{
        setLoader(true)
        setError(null)

        const respone= await fetch(process.env.REACT_APP_API_URL+'/register/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({first_name,last_name,email,password,username})
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            setLoader(false)
            setError(json.error)
        }
        if(respone.ok)
        {
            localStorage.setItem('user',JSON.stringify(json))
            
            setLoader(false)
        }
    }
    return{signup,isLoading,error}
}
