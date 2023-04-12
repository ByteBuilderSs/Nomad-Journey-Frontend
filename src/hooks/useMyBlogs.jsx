import { toast } from "react-toastify";
import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export const useMyBlogs=()=>{
    const[blogs,setBlogs]=useState([]) 
    const myblogs= async() =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access

        const respone= await fetch(process.env.REACT_APP_API_BLOG+'userpost/',{ 
            method :'GET',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`}
        })
        const json = await respone.json();
        const data = json.data;

        if(!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if(respone.ok)
        {
            console.log("********** All User's Post ********** ", data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].created_at) {
                    let time = new Date(data[i].created_at);
                    data[i].created_at = new DateObject({
                        date: time,
                        format: "YYYY/MM/DD,   HH:MM:SS"
                    }).format("YYYY/MM/DD, HH:MM:SS");
                }
            }
            setBlogs(data);
        }
    }
    return{myblogs,blogs}
}



  
