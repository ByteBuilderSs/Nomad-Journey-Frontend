import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";


export const useSignup=()=>{
    
    
    const naviagte=useNavigate()
    const signup= async(first_name,last_name,email,password,password_again,username) =>{
       
        const respone= await fetch(process.env.REACT_APP_API_REGISTER+'register/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({first_name,last_name,email,password,password_again,username})
        }).catch((error)=>console.log(error));
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log(json)
            let msg=Object.values(json)
            toast.error(JSON.stringify(msg[0]))  
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

