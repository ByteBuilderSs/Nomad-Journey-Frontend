import { useState } from "react";
import {useAuthContext} from './useAuth'
import * as Yup from 'yup';


export const useLogin=()=>{
    const[error,setError]=useState('')
    const[isLoading,setLoader]=useState('')
    const {dispatch}=useAuthContext()
    const login= async(email,password) =>{
        setLoader(true)
        setError(null)

        const respone= await fetch(process.env.REACT_APP_API_URL+'/login/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({email,password})
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log(respone)
            setLoader(false)
            setError(respone.statusText)
           
        }
        if(respone.ok)
        {
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type:'LOGIN',payload:json})
            setError(null)
            setLoader(false)
        }
    }
    return{login,isLoading,error}
}



  