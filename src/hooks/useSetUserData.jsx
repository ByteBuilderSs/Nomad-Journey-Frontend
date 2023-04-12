import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export const useUserData = () => {
    const[userInfo, setUserData]=useState([])
    const userdata = async() => {
        
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const username=allData.username
        
        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'GetUserProfileForOverview/'+username,{ 
            method :'GET',
            headers :{'Content-Type':'application/json'},
            
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
            console.log()
                
        }
        if(respone.ok)
        {
            console.log(json)
            setUserData(json.data)
        }
    }
    return{userdata,userInfo}
}



  
