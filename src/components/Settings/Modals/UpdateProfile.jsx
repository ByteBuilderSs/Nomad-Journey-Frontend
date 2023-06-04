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
            url: `https://api.nomadjourney.ir/api/v1/accounts/get-profile-photo/${user_id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            console.log("+++++++++ THE RESULT IS ++++++++ ", result);
            /* TODO => HOW CAN I CONVERT THE URL TO FILE */
            if (result.data.profile_photo_URL && result.data.profile_photo_URL != "" ) {
                setProfileImageURL("https://api.nomadjourney.ir" + result.data.profile_photo_URL);
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
                url: `https://api.nomadjourney.ir/api/v1/accounts/UserProfileEdit4/${username}`,
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
            url: `https://api.nomadjourney.ir/api/v1/accounts/UserProfileEdit4/${username}`,
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
            <Card>
                <form enctype="multipart/form-data">
                    <Stack spacing={6} sx={{ paddingBottom: "1rem" }}>
                        <Item>
                            <Stack alignItems={`center`} spacing={1}>
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
                                                        <img style={{ width:'15rem', height:'15rem', objectFit: 'fill', objectPosition: "center"  }} src={profileImageURL}/>
                                                    </div>) :
                                                <LetteredAvatar name={username} backgroundColor='#FFE5B4' size={100} />
                                        }
                                    </IconButton>
                                </Item>
                                <Stack direction={'row'} spacing={1}>
                                    <Item>
                                        <Button
                                            sx={{ width: "100%", textTransform: "none" }}
                                            variant="outlined"
                                            component="label"
                                            startIcon={<EditIcon />}
                                            size='small'
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
                                        {
                                            profileImageURL && profileImageURL !== "" ? (
                                                <Button
                                                    sx={{  width: "100%", textTransform: "none" }}
                                                    variant="outlined"
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
                                                    size='small'
                                                    onClick={(e) => {
                                                        handleDeleteClick(e);
                                                    }}
                                                >
                                                    Remove photo
                                                </Button>
                                            ) : null
                                        }
                                    </Item>
                                </Stack>
                                <Item>
                                    <Button
                                        sx={{ mt: 2, width: "100%", textTransform: "none" }}
                                        variant="contained"
                                        color="success"
                                        startIcon={<CheckIcon />}
                                        onClick={handleUploadClick}
                                    >
                                        Save Changes
                                    </Button>
                                </Item>
                            </Stack>
                        </Item>
                    </Stack>
                </form>
            </Card>
        </div>
    )
}

export default UpdateProfileImage
