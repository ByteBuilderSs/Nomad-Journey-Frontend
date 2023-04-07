import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export const useUserData=()=>{

    const[userInfo,setUserData]=useState([])
    const userdata= async() =>{
        
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access
        console.log(access)
        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'login-user/',{ 
            method :'GET',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`},
            
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
            console.log()
                
        }
        if(respone.ok)
        {
            console.log("success"+json)
            setUserData(json)
        }
    }
    return{userdata,userInfo}
}



  
