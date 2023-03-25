import { useState } from "react";
import { Navigate} from "react-router-dom";
import {useAuthContext} from './useAuth'
import * as Yup from 'yup'


export const useSignup=()=>{
    const[error,setError]=useState('')
    const[isLoading,setLoader]=useState('')
    const {dispatch}=useAuthContext()
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
    return{signup,isLoading,error}
}
