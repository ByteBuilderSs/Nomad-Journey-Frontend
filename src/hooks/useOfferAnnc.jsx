
import React, { useEffect } from "react";
import axios from 'axios';
import {FetchAnnc} from "./useAnnounceFetchMainPage"
import { toast } from "react-toastify";

export const Make_Offer = () => {
    const fetchAnnc = FetchAnnc()
    const fetchOffer = async (id) => {
    
        const signedInUser = JSON.parse(localStorage.getItem("tokens"))
        console.log(signedInUser)
        
        axios({
            method: "post",
            url: `https://api.nomadjourney.ir/api/v1/anc_request/create-request/${id}`,
            headers: {
            'Authorization': `Bearer ${signedInUser.access}`
            },
        }).then(response => {
            toast.success("your offer submited successfully");
            fetchAnnc();
        })
        .catch(error =>{
            if(error.response.status == 400){
                toast.error("Exact location of the announcer is needed!!")
                fetchAnnc();
            }
            else{
                toast.error("Error while making an offer!!")
                console.error(error);
                fetchAnnc();
            }
        })
        
    }
    return fetchOffer;
}
