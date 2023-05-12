import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {setCountry, setCity, setUserName, setFirstName, setLastName, setMail} from "../ReduxStore/features/User/useSlice"

const FetchUserInfo = async (userName) => {
    try {
          
        await axios({
          method: "get",
          url: `http://188.121.102.52:8000/api/v1/accounts/user/${userName}`,
        }).then(response => {
        
            return response.data;
        })
        
        
      } catch (error) {
        console.error(error);
      }
}


export const useLogin=()=>{

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const login= async(email,password) => {
        const respone= await fetch(process.env.REACT_APP_API_ACCOUNTS+'token/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'},
            body :JSON.stringify({email,password})
        })
        const json = await respone.json()
        if(!respone.ok)
        {
            console.log("error");
            toast.error("You are not authorized to login!");
        }
        if(respone.ok)
        {
            /*
                TODO => break the token object into key, value pairs and then add them to Local Storage
            */
            console.log(json);

            const result = JSON.stringify(json)
            const userInfo = FetchUserInfo(result.username)
            
            dispatch(setCity(userInfo.city_name))
            dispatch(setCountry(userInfo.city_country))
            dispatch(setUserName(userInfo.username))
            dispatch(setFirstName(userInfo.first_name))
            dispatch(setLastName(userInfo.last_name))
            dispatch(setMail(userInfo.email))

            console.log("+++++++++++++++++ THE RESULT AFTER LOGIN IS +++++++++++++++++++ ", result)

            localStorage.setItem('tokens', result);
            navigate("/home/Dashboard/", { replace: true });
            toast.success("You logged in successfully")
        }
    }
    return{login}
}


