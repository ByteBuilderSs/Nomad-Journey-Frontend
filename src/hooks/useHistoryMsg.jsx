import React from "react";


export const useAllMsgs = () => {
    
    const[allmsg, setAllmsg]=React.useState([])
    const allMsgs = async() => {
        
        const username = JSON.parse(localStorage.getItem('tokens')).username
        
        const respone= await fetch(process.env.REACT_APP_API_TICKET+'get-all-messages/'+username+'/<receiver_username>/',{ 
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
            setAllmsg(json.data)
        }
    }
    return{allMsgs,allmsg}
}

