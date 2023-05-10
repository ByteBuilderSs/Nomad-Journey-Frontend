import React, { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setAnncData, setLoader, setSort, setPagination, setPaginCount, setPage } from "../ReduxStore/features/MainPage/mainPageSlice"
import axios from 'axios';


export const FetchAnnc = () => {
    const dispatch = useDispatch()
    // const value = useSelector((state) => state.mainpage.page)
    // const sort = useSelector((state) => state.mainpage.sort)

    const fetchAnnc = async (value = 1, sort = "sort_by=anc_timestamp_created&descending=True") =>{
        try {
    
        const signedInUser = JSON.parse(localStorage.getItem("tokens"))
    
    
        const config = {
            headers: {
            Authorization: `Bearer ${signedInUser['access']}`
            }
        };
        
        await axios.get(`http://188.121.102.52:8000/api/v1/announcement/get-announcements-for-host/?page=${value}&${sort}`, config).then(
            (response) => {
            
            dispatch(setAnncData(response.data.results))
            console.log(response.data)
            console.log(sort)
            dispatch(setPaginCount(response.data.page_count))
            if(response.data.count != 0){
                dispatch(setPagination(true))
            }
    
            dispatch(setLoader(false))
            }
        )
        
        
        } catch (error) {
        console.error(error);
        }
    }

    return fetchAnnc;
    
}
