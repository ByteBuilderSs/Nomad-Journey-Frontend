import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin=()=>{

    const navigate=useNavigate()
    const login= async(email,password) =>{
              
        const respone= await fetch(process.env.REACT_APP_API_REGISTER+'token/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({email,password})
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log(json)
            let msg=Object.values(json)
            toast.error(JSON.stringify(msg[0]))  
        }
        if(respone.ok)
        {
            
            localStorage.setItem('tokens',JSON.stringify(json))
            navigate("/home/Dashboard/", { replace: true });
            toast.success("You logged in successfully")
        }
    }
    return{login}
}



  
