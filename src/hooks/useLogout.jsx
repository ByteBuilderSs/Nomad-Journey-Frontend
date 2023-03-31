import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout=()=>{
   
    const navigate=useNavigate()
    const logout= async() =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const refresh_token=allData.refresh
        console.log(refresh_token)
        const access=allData.access
        console.log(access)
        const respone= await fetch(process.env.REACT_APP_API_REGISTER+'logout/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`},
            body :JSON.stringify({refresh_token})
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log(json)
            let msg=Object.values(json)
            toast.error(JSON.stringify(msg[0]))  
        }
        if(respone.ok)
        {
           localStorage.removeItem('tokens')
           localStorage.removeItem('user')
           navigate("/login", { replace: true });
           toast.success("Logged out successfully");
        }
    }
    return{logout}
}



  
