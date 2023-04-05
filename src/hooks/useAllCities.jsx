import { toast } from "react-toastify";
import { useState } from "react";
export const useCities=()=>{
   
    const[Annoc,setAnnocments]=useState([]) 
    const getAllCities= async() =>{
        
        const respone= await fetch(process.env.REACT_APP_API_REQ_ANNONCE+'get-requests-on-announcement/'+user_id,{ 
            method :'GET',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`}
        })
        const json =await respone.json()
        console.log(json)
        if(!respone.ok)
        {
            
        }
        if(respone.ok)
        {
           setAnnocments(json)
        }
    }
    return{getAllCities}
}



  
