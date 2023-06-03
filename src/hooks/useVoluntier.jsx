import React from "react";


export const useVoluntier = () => {
    
    const[volun, setVulon]=React.useState([])
    const allvoluntiers = async(anc_id) => {
        
        const username = JSON.parse(localStorage.getItem('tokens')).username
        
        const respone= await fetch(process.env.REACT_APP_API_ANNONCMENTS+'user-announcements-more-details/'+'40/',{ 
            method :'GET',
            headers :{'Content-Type':'application/json'}})

        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
        }
        if(respone.ok)
        {
            console.log(json.volunteers)
            setVulon(json.volunteers)
        }
    }
    return{allvoluntiers,volun}
}

