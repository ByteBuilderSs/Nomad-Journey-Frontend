import React from "react";


export const useAncUsers = () => {
    
    const[usersReq, setUsersReq]=React.useState([])
    const allUsersReq = async() => {
        
        const username = JSON.parse(localStorage.getItem('tokens')).username
        
        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'get-users-requests-announcer/'+username,{ 
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
            setUsersReq(json.data)
        }
    }
    return{allUsersReq,usersReq}
}

