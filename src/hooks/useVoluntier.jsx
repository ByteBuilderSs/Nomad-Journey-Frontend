import React from "react";


export const useVoluntier = () => {
    
    const[volun, setVulon]=React.useState([])
    const allvoluntiers = async() => {
        
        const username=JSON.parse(localStorage.getItem('tokens')).username

        const respone= await fetch(process.env.REACT_APP_API_TICKET+'get-contacts-volunteers/'+username,{ 
            method :'GET',
            headers :{'Content-Type':'application/json'}})

        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
        }
        if(respone.ok)
        {
            console.log(json)
            setVulon(json.data)
        }
    }
    return{allvoluntiers,volun}
}

