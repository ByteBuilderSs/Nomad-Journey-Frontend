
import React, { useEffect } from "react";
import axios from 'axios';
import {FetchAnnc} from "./useAnnounceFetchMainPage"

export const Make_Offer = () => {
    const fetchAnnc = FetchAnnc()
    const fetchOffer = async (id) => {
        try {
    
        const signedInUser = JSON.parse(localStorage.getItem("tokens"))
        console.log(signedInUser)
        
        axios({
            method: "post",
            url: `http://188.121.102.52:8000/api/v1/anc_request/create-request/${id}`,
            headers: {
            'Authorization': `Bearer ${signedInUser.access}`
            },
        }).then(response => {
            
            fetchAnnc();
        })
        
        
        } catch (error) {
        console.error(error);
        }
    }
    return fetchOffer;
}
