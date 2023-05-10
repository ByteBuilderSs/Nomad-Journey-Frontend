import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export const useUserData = (url_username) => {
    console.log("THE USERNAME IN URL IS ", url_username);
    const[userInfo, setUserData]=useState([])
    const userdata = async() => {
        
        const allData = JSON.parse(localStorage.getItem('tokens'))
        const username = allData.username
        
        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'GetUserProfileForOverview/'+url_username,{ 
            method :'GET',
            headers :{'Content-Type':'application/json'},
            
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
        }
        if(respone.ok)
        {
            console.log(json)
            setUserData(json.data)
        }
    }
    return{userdata,userInfo}
}

