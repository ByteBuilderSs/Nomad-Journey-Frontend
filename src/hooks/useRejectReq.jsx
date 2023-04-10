import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

export const useRejectReq=()=>{

    const RejectReq= async(anc_id,host_id) =>{
        const allData=JSON.parse(localStorage.getItem('tokens'))
        const access=allData.access

        const respone= await fetch(process.env.REACT_APP_API_ANNONCMENTSREQ+'reject-request/'+anc_id+'/'+host_id,{
            method :'PUT',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`},
        })
        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
            console.log(json)
                
        }
        if(respone.ok)
        {
            toast.success("You have reject your host !")
        }
    }
    return{RejectReq}
}



  
