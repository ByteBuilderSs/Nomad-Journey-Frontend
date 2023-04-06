import { toast } from "react-toastify";
import { useState } from "react";
export const useCities=()=>{
   
    const[cities,setCityName]=useState([]) 
    const getAllCities= async() =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access
        const user_id=allData.user_id
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
           setCityName(json)
        }
    }
    return{getAllCities,cities}
}



  
