import { useState } from "react";


export const useAllposts = () => {
    
    const[allposts, setAllposts]=useState([])
    const posts = async() => {
        
        const allData = JSON.parse(localStorage.getItem('tokens'))
        const username = allData.username
        
        const respone= await fetch(process.env.REACT_APP_API_BLOG+'posts/',{ 
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
            setAllposts(json.data)
        }
    }
    return{posts,allposts}
}

