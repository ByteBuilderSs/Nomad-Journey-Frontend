import React from "react";
import {useCounter, useCounterActions} from "../Context/CounterProvider";



export const useLikePost=()=>{

    const tokens=JSON.parse(localStorage.getItem('tokens'))
    const access_token=tokens.access

    const setCounter = useCounterActions();
    const counter = useCounter();

    


    const likepost = async(blog_id) => {

        
        const respone= await fetch(process.env.REACT_APP_API_LIKE+'create-like/'+blog_id,{ 
            method :'POST',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access_token}`},
           
        }).catch((error)=>console.log(error));
        
        const json = await respone.json()
        if (!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if (respone.ok)
        {
            
            // setCounter(counter+1)
        }
    }



    const unlikepost = async(blog_id) => {

        const user_id=tokens.user_id

        const respone= await fetch(process.env.REACT_APP_API_LIKE+'delete-like/'+blog_id+'/'+user_id,{ 
            method :'DELETE',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access_token}`},
           
        }).catch((error)=>console.log(error));
        
        const json = await respone.json()
        if (!respone.ok)
        {
            console.log("error")
            console.log(json)
        }
        if (respone.ok)
        {
            // setCounter(counter-1)
            
            
        }
    }
    return{likepost,unlikepost}
}

