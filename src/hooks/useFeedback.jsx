import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";



export const useFeedback=()=>{

   const navigate=useNavigate()
    const feedBack= async(question_1,question_2,question_3,question_4,question_5,ans_id) => {
        const username=JSON.parse(localStorage.getItem('tokens')).username
        const access=JSON.parse(localStorage.getItem('tokens')).access
        const respone= await fetch(process.env.REACT_APP_API_FEEDBACK+'feedback-user/'+username,{ 
            method :'POST',
            headers :{'Content-Type':'application/json','Authorization': `Bearer ${access}`},
            body :JSON.stringify({question_1,question_2,question_3,question_4,question_5,ans_id})
        })
        const json = await respone.json()
        if(!respone.ok)
        {
            console.log("error");
            
        }
        if(respone.ok)
        {
            console.log(json);
            toast.success("Your Feedback Sent Successfully!")
            
        }
    }
    return{feedBack}
}
