import { useState } from "react";


export const useSearchBlog = () => {
    
    const[blogs, setblogs]=useState([])
    const searchBlogs = async() => {
        
        const respone= await fetch(process.env.REACT_APP_API_BLOG+'search-blog/',{ 
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
            setblogs(json.data)
        }
    }
    return{searchBlogs,blogs}
}

export const useSerachFor=()=>
{
    const searchedItem = async() => {
        
        const respone= await fetch(process.env.REACT_APP_API_BLOG+'search-blog/',{ 
            method :'POST',
            headers :{'Content-Type':'application/json'}})

        const json =await respone.json()
        if(!respone.ok)
        {
            console.log("error")
        }
        if(respone.ok)
        {
            console.log(json)
        }
    }
    return{searchedItem}
}
