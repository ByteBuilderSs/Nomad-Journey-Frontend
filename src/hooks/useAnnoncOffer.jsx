import { toast } from "react-toastify";
import { useState } from "react";
export const useAnnoncOffer=({anc_id})=>{
   
    const[Annoc,setAnnocments]=useState([]) 
    const annoneOffer= async() =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access
        
        const respone= await fetch(process.env.REACT_APP_API_ANNONCMENTS+'get-announcement-detail-by-id/'+anc_id,{ 
            method :'GET',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`}
        })
        const json =await respone.json()
        console.log(json)
        if(!respone.ok)
        {
            console.log(respone)
        }
        if(respone.ok)
        {
            // console.log(json)
            // json.map((item)=>{item.hosts.map((k,v)=>{console.log(k)})})
            setAnnocments(json)
        }
    }
    return{annoneOffer,Annoc}
}