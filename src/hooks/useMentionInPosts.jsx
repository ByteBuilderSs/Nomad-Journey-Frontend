import { useState } from "react";
import { useParams } from "react-router-dom";
export const useMentionInPosts=()=>{

    const [mentions,setMenstions]=useState([])

    const mentionPosts = async(anc_id) => {
        const respone= await fetch(process.env.REACT_APP_API_ANNONCMENTS+'user-announcements-more-details/'+ anc_id,{ 
            method :'GET',
            headers :{'Content-Type':'application/json'},
        }).catch((error)=>console.log(error));
        
        const json = await respone.json()
        if (!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if (respone.ok)
        {
            setMenstions(json)
        }
    }
    return{mentionPosts,mentions}
}

