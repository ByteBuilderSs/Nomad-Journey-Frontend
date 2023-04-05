import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";


export const useSignup=()=>{
    
    
    const naviagte=useNavigate()
    const signup= async(first_name,last_name,email,password,password_again,username,User_city) =>{
       
        const respone= await fetch(process.env.REACT_APP_API_REGISTER+'register/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({first_name,last_name,email,password,password_again,username,User_city})
        }).catch((error)=>console.log(error));
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if(respone.ok)
        {
            localStorage.setItem('user',JSON.stringify(json))
            toast.success("Your account created successfully");
            naviagte("/login", { replace: true });
        }
    }
    return{signup}
}

