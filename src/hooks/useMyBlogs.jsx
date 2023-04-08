import { toast } from "react-toastify";
import { useState } from "react";
export const useMyBlogs=()=>{
   
    const[blogs,setBlogs]=useState([]) 
    const myblogs= async() =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access
       
        const respone= await fetch(process.env.REACT_APP_API_BLOG+'userpost/',{ 
            method :'GET',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`}
        })
        const json =await respone.json()

        if(!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if(respone.ok)
        {
            
            setBlogs(json.data)
        }
    }
    return{myblogs,blogs}
}



  
