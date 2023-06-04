
import {useNavigate} from "react-router-dom";

export const useImage=()=>{
    const [imagePro,setImagePro]=useState([])
    const navigate=useNavigate()
     const imageProfile= async() => {
         const username=JSON.parse(localStorage.getItem('tokens')).username
         const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'get-profile-photo/'+username,{ 
             method :'GET',
            
         })
         const json = await respone.json()
         if(!respone.ok)
         {
             console.log("error");
             
         }
         if(respone.ok)
         {
            if (respone.data.profile_photo_URL && respone.data.profile_photo_URL != "" ) 
            {
                setImagePro(process.env.REACT_APP_API+ result.data.profile_photo_URL);
            } 
         }
     }
     return{imageProfile,imagePro}
 }
 