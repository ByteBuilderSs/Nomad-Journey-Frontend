import { useState } from "react"

export const useImage=()=>{

     const [imagePro,setImagePro]=useState("")

     const imageProfile= async(user_id) => {

        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'get-profile-photo/'+user_id,{ 
            method :'GET',
            headers :{'Content-Type':'application/json'}
         })
         const json = await respone.json()
         if(!respone.ok)
         {
             console.log("error");
             
         }
         if(respone.ok)
         {
            console.log(json)
            if (json.profile_photo_URL && json.profile_photo_URL != "" ) 
            {
                setImagePro(process.env.REACT_APP_API+ json.profile_photo_URL)
            } 
            else
            {
                setImagePro("")
            }
         }
     }
     return{imageProfile,imagePro}
 }
 