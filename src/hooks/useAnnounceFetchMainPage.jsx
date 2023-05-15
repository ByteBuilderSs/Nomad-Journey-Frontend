import React, { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { setAnncData, setLoader, setSort, setPagination, setPaginCount, setPage } from "../ReduxStore/features/MainPage/mainPageSlice"
import axios from 'axios';


export const FetchAnnc = () => {
    const dispatch = useDispatch()
    // const value = useSelector((state) => state.mainpage.page)
    // const sort = useSelector((state) => state.mainpage.sort)

    const fetchAnnc = async (value = 1, sort = "sort_by=anc_timestamp_created&descending=True", filters = {"language" : [], "city" : [], "country" : [], "date" : []}) =>{
        try {
    
        const signedInUser = JSON.parse(localStorage.getItem("tokens"))
        
        let cities = (filters["city"] == undefined || filters["city"].length == 0) ? "" : "&city="
        let languages = (filters["language"] == undefined || filters["language"].length == 0) ? "" : "&language="
        let countries = (filters["country"] == undefined || filters["country"].length == 0) ? "" : "&country="

        let startTime = (filters["date"] == undefined || filters["date"].length == 0) ? "" : "&start_time="
        let endTime = (filters["date"] == undefined || filters["date"].length == 0) ? "" : "&end_time="
        
        if (filters["date"] == undefined || filters["date"].length != 0){

            let date = filters["date"][0].split(" - ")
            let parts = date[0].split("/"); // Split the string into an array [month, day, year]
            const start = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
            parts = date[1].split("/"); // Split the string into an array [month, day, year]
            const end = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
            

            startTime = startTime.concat(start);
            endTime = endTime.concat(end);

            console.log(startTime)
            console.log(endTime)

        }

        if(filters["city"] != undefined ){

            for (let i = 0; i < filters["city"].length ; i++){
                if (i == filters["city"].length - 1)
                    cities = cities.concat(`${filters["city"][i]}`);
                else
                    cities = cities.concat(`${filters["city"][i]},`);
            }
        }
        if(filters["language"] != undefined ){
            for (let i = 0; i < filters["language"].length ; i++){
                if (i == filters["language"].length - 1)
                    languages = languages.concat(`${filters["language"][i]}`);
                else
                    languages = languages.concat(`${filters["language"][i]},`);
            }
        }
        if(filters["country"] != undefined ){
            for (let i = 0; i < filters["country"].length ; i++){
                if (i == filters["country"].length - 1)
                    countries = countries.concat(`${filters["country"][i]}`);
                else
                    countries = countries.concat(`${filters["country"][i]},`);
            }
        }  
        
    
        const config = {
            headers: {
            Authorization: `Bearer ${signedInUser['access']}`
            }
        };
        
        await axios.get(`http://188.121.102.52:8000/api/v1/announcement/get-announcements-for-host/?page=${value}&${sort}${cities}${countries}${languages}${startTime}${endTime}`, config).then(
            (response) => {
            console.log(response.data.results)
            dispatch(setAnncData(response.data.results))
            // console.log(response.data)
            // console.log(sort)
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
