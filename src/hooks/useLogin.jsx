import {useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {setCountry, setCity, setUserName, setFirstName, setLastName, setMail} from "../ReduxStore/features/User/useSlice"




export const useLogin=()=>{

    const dispatch = useDispatch()
    const navigate=useNavigate()


    const FetchUserInfo = async (userName) => {
        try {
              
            await axios({
              method: "get",
              url: `https://api.nomadjourney.ir/ api/v1/accounts/user/${userName}`,
            }).then(response => {
                dispatch(setCity(response.data.city_name))
                dispatch(setCountry(response.data.city_country))
                dispatch(setUserName(response.data.username))
                dispatch(setFirstName(response.data.first_name))
                dispatch(setLastName(response.data.last_name))
                dispatch(setMail(response.data.email))
                
            })
            
            
        } catch (error) {
        console.error(error);
        }
    }


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

            const result = JSON.stringify(json)
            await FetchUserInfo(JSON.parse(result).username)
            

            console.log("+++++++++++++++++ THE RESULT AFTER LOGIN IS +++++++++++++++++++ ", result)

            localStorage.setItem('tokens', result);
            navigate("/home/Dashboard/", { replace: true });
            toast.success("You logged in successfully")
        }
    }
    return{login}
}


