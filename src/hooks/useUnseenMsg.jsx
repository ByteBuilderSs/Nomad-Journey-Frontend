import React from "react";


export const useUnseenMsg = () => {
    
    const[unseen, setUnseen]=React.useState([])
    const unseenmsgs = async() => {
        
        const username=JSON.parse(localStorage.getItem('tokens')).username
        const access=JSON.parse(localStorage.getItem('tokens')).access

        const respone= await fetch(process.env.REACT_APP_API_TICKET+'all-unseen-messages/'+username,{ 
            method :'GET',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`}})

        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
        }
        if(respone.ok)
        {
            console.log(json)
            setUnseen(json.count)
        }
    }
    return{unseenmsgs,unseen}
}

