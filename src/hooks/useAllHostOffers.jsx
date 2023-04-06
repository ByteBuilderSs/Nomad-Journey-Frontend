import { toast } from "react-toastify";
import { useState } from "react";
export const useHostOffers=()=>{
   
    const[Annoc,setAnnocments]=useState([]) 
    const hostOffers= async() =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access
        const user_id=allData.user_id
        const respone= await fetch(process.env.REACT_APP_API_ANNONCMENTS+'user-announcements-with-host-request/'+user_id,{ 
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
            localStorage.setItem('AnnonceId',JSON.stringify(json))
            console.log(respone.statusText)
            setAnnocments(json)
        }
    }
    return{hostOffers,Annoc}
}



  
