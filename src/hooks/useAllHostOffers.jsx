import { toast } from "react-toastify";
import { useState } from "react";
export const useHostOffers=()=>{
   
    const[cityName,setCity]=useState([]) 
    const hostOffers= async() =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access
        const user_id=allData.user_id
        const respone= await fetch(process.env.REACT_APP_API_REGISTER,{ 
            method :'GET',
            headers :{'Content-Type':'application/json'}
        })
        const json =await respone.json()
        console.log(json)
        if(!respone.ok)
        {
            
        }
        if(respone.ok)
        {
           setCity(json)
        }
    }
    return{hostOffers,cityName}
}



  
