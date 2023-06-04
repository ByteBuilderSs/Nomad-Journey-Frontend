import { useState } from "react";


export const useSearchBlog = () => {
    
    const[searchRes, setblogs]=useState([])
    const searchBlogs = async(searchedTxt) => {
        
        const respone= await fetch(process.env.REACT_APP_API_BLOG+`search-blog?search=${searchedTxt}`,{ 
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
            setblogs(json)
        }
    }
    return{searchBlogs,searchRes}
}


