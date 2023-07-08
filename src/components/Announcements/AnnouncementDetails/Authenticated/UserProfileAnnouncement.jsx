import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import LetteredAvatar from "react-lettered-avatar";
import { useCounter } from "../../../../Context/CounterProvider";


export default function UserProfile({user_id, first_name, imageSize, profileSize})
{
    const [profileImageURL, setProfileImageURL] = useState("");
    const counter = useCounter();

    useEffect(() => {
        if (user_id !== "" && user_id) {
            axios({
                method: "get",
                url: `https://api.nomadjourney.ir/api/v1/accounts/get-profile-photo/${user_id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((result) => {
                console.log("+++++++++ THE RESULT IS ++++++++ ", result);
                if (result.data.profile_photo_URL && result.data.profile_photo_URL != "" ) {
                    setProfileImageURL("https://api.nomadjourney.ir" + result.data.profile_photo_URL);
                }
            })
        }
    }, [counter, user_id]);
    
    return(
        <>
            {
                profileImageURL && profileImageURL !== "" ?
                    (
                        <div style={{borderRadius: '10rem', overflow: 'hidden'}}>
                            <img style={{ width: profileSize, height:profileSize, objectFit: 'fill', objectPosition: "center"  }} src={profileImageURL}/>
                        </div>
                    ) :

                    <LetteredAvatar name={first_name} backgroundColor='#D5D8DD'  size={imageSize}/>
            }
            </>
    );
}