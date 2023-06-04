import React from 'react';
import {
    Box,
    Paper,
    Grid,
    FormControl,
    TextField,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Avatar,
    Card,
    Typography,
    IconButton
} from '@mui/material';
import { Item } from "semantic-ui-react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import LetteredAvatar from 'react-lettered-avatar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useCounter, useCounterActions } from "../../../Context/CounterProvider";
import {MdOutlineDone} from "react-icons/md";

let username = "";
let access_token = "";
let user_id = "";
if (localStorage.getItem('tokens')) {
    const Data = JSON.parse(localStorage.getItem('tokens'));
    username = Data.username;
    access_token = Data.access;
    user_id = Data.user_id;
}

const UpdateProfileImage = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [imageSizeError, setImageSizeError] = useState(false);
    const [profileImageURL, setProfileImageURL] = useState("");
    const counter = useCounter();
    const setCounter = useCounterActions();

    const handleInputFile = async (e) => {
        console.log("++++++++++++++++++++++++++++++++++", e.target.files[0]);
        const file = e.target.files[0];

        const size_mb = file.size / 1024 ** 2;
        const size_kb = size_mb * 1000;
        if (size_kb <= 500) {
            setImageSizeError(false);
            setProfileImage((prevState) => ({
                ...prevState,
                profileImage:  file ?  file : null,
            }));
            setProfileImageURL(URL.createObjectURL(file));
        } else {
            setImageSizeError(true);
            toast.warning("Image size can not be more than 300kb.");
        }
    }

    const loadUserProfilePhoto = async () => {
        axios({
            method: "get",
            url: `http://188.121.102.52:8000/api/v1/accounts/get-profile-photo/${user_id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            console.log("+++++++++ THE RESULT IS ++++++++ ", result);
            /* TODO => HOW CAN I CONVERT THE URL TO FILE */
            if (result.data.profile_photo_URL && result.data.profile_photo_URL != "" ) {
                setProfileImageURL("http://188.121.102.52:8000" + result.data.profile_photo_URL);
            }

        }).catch((error) => {
            toast.error("Something went wrong while fetching user profile photo.")
        })
    }

    useEffect(() => {
        loadUserProfilePhoto();
    }, []);


    const handleUploadClick = async (event) => {
        event.preventDefault();
        let isDataValid = true;
        let formData = new FormData();

        if (profileImage && profileImage.profileImage) {
            formData.append('profile_photo', profileImage.profileImage);
            const size_mb = profileImage.profileImage.size / 1024 ** 2;
            const size_kb = size_mb * 1000;

            if (size_kb > 300) {
                setImageSizeError(true);
                isDataValid = false;
                toast.warning("Image size can not be more than 300kb.");
            }
        }
        else {
            let empty_file = new File([], "empty");
            formData.append('profile_photo', null);
        }
        console.log("************* THE FORM DATA IS ************* ", formData);


        if (isDataValid) {
            axios({
                method: "patch",
                url: `http://188.121.102.52:8000/api/v1/accounts/UserProfileEdit4/${username}`,
                headers: {
                    'Authorization': `Bearer ${access_token}`
                },
                data : formData
            }).then((res) => {
                console.log(res);
                toast.success("Changes updated successfully.");
                setCounter(counter + 1);
            }).catch((error) => {
                toast.error("Something went wrong while updating information.");
                console.log(error);
            })
        }
    }

    const handleDeleteClick = async (event) => {
        event.preventDefault();
        axios({
            method: "delete",
            url: `http://188.121.102.52:8000/api/v1/accounts/UserProfileEdit4/${username}`,
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
        }).then((res) => {
            console.log(res);
            toast.success("Profile photo removed successfully.");
            setProfileImage(null);
            setProfileImageURL(prevURL => "");
            setImageSizeError(false);
            setCounter(counter + 5);
        }).catch((error) => {
            toast.error("Something went wrong while updating information.");
            console.log(error);
        })
    }

    return (
        <div>
                <form enctype="multipart/form-data">
                    <div style={{
                        paddingTop: "2rem",
                        paddingBottom: "2.5rem",
                        borderRadius:"15px",
                        border:"solid 3px #004E89",
                        backgroundColor:"rgba(0,78,137,0.6)",
                        height:"100%"
                    }}>
                    <Stack spacing={6} sx={{ paddingLeft:"1rem",
                        paddingRight:"1rem",}}>
                        <Item>
                            <Stack alignItems={`center`} spacing={3}>
                                <Item>
                                    <IconButton component="label" sx={{ mt: "2rem"}}>
                                        <input
                                            onChange={(e) => handleInputFile(e)}
                                            hidden
                                            accept="image/*"
                                            multiple
                                            type="file"
                                            max={20}
                                        />
                                        {
                                            profileImageURL && profileImageURL !== "" ? (
                                                    <div style={{borderRadius: '10rem', overflow: 'hidden'}}>
                                                        <img style={{ width:'8rem', height:'8rem', objectFit: 'fill', objectPosition: "center"  }} src={profileImageURL}/>
                                                    </div>) :
                                                <LetteredAvatar name={username} backgroundColor='#FFE5B4' size={100} />
                                        }
                                    </IconButton>
                                </Item>
                                <Item>
                                    <Button
                                        sx={{ width: "100%", textTransform: "none",
                                            color:"#F7C59F", borderRadius:"15px",
                                            border:"solid 2px #F7C59F",
                                            paddingLeft:"2rem",
                                            paddingRight:"2rem",
                                            "&:hover":{
                                                border:"solid 2px #F7C59F",
                                                backgroundColor:"rgba(247,197,159,0.1)"
                                            }
                                        }}
                                        variant="outlined"
                                        component="label"
                                        startIcon={<EditIcon />}
                                    >
                                        Upload a photo
                                        <input
                                            onChange={(e) => handleInputFile(e)}
                                            hidden
                                            accept="image/*"
                                            multiple
                                            type="file"
                                        />
                                    </Button>
                                </Item>
                                <Item>
                                    <Stack direction={'row'} spacing={1}>
                                        <Item>
                                        <IconButton
                                            sx={{
                                                color:"#20fc00",
                                                "&:hover":{
                                                    backgroundColor: "rgba(32,252,0,0.1)"
                                                }
                                            }}
                                            onClick={handleUploadClick}>
                                            <CheckIcon />
                                        </IconButton>
                                        </Item>
                                        <Item>
                                            {
                                                profileImageURL && profileImageURL !== "" ? (
                                                    <IconButton
                                                        sx={{
                                                            color:"#ff0000",
                                                            "&:hover":{
                                                                backgroundColor: "rgba(255,0,0,0.05)"
                                                            }
                                                        }}
                                                        onClick={(e) => {
                                                            handleDeleteClick(e);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                ) : null
                                            }
                                        </Item>
                                    </Stack>
                                </Item>
                            </Stack>
                        </Item>
                    </Stack>
                    </div>
                </form>
        </div>
    )
}

export default UpdateProfileImage
