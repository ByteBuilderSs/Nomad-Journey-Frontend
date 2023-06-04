import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import LetteredAvatar from "react-lettered-avatar";

export default function UserProfile({user_id, first_name, imageSize, profileSize})
{
    const [profileImageURL, setProfileImageURL] = useState("");
    useEffect(() => {
        axios({
            method: "get",
            url: `https://api.nomadjourney.ir/ api/v1/accounts/get-profile-photo/${user_id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            console.log("+++++++++ THE RESULT IS ++++++++ ", result);
            if (result.data.profile_photo_URL && result.data.profile_photo_URL != "" ) {
                setProfileImageURL("http://188.121.102.52:8000" + result.data.profile_photo_URL);
            }

        })
    }, []);
    return(
        <>
            {
                profileImageURL && profileImageURL !== "" ?
                    (
                        <div style={{borderRadius: '10rem', overflow: 'hidden'}}>
                            <img style={{ width: profileSize, height:profileSize, objectFit: 'fill', objectPosition: "center"  }} src={profileImageURL}/>
                        </div>
                    ) :

                    <LetteredAvatar name={first_name} backgroundColor='#FFE5B4'  size={imageSize}/>
            }
            </>
    );
}