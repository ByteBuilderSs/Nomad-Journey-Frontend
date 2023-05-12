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

const SideBarCard = () => {
    const Data = JSON.parse(localStorage.getItem('tokens'));
    const username = Data.username;
    const access_token = Data.access;
    const user_id = Data.user_id;
    const [profileImage, setProfileImage] = useState(null);
    const [imageSizeError, setImageSizeError] = useState(false);
    const [profileImageURL, setProfileImageURL] = useState("");

    const handleInputFile = (event) => {
        setProfileImage(event.target.files);
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
                setProfileImageURL(result.data.profile_photo_URL);
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
        
        formData.append('profile_photo', profileImage[0]);
        console.log("************* THE FORM DATA IS ************* ", formData);

        const size_mb = profileImage[0].size / 1024 ** 2;
        const size_kb = size_mb * 1000;

        if (size_kb > 300) {
            setImageSizeError(true);
            isDataValid = false;
            toast.error("The image size can not be more than 300kb.")
        }
        
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
            }).catch((error) => {
                toast.error("Something went wrong while updating information.");
                console.log(error);
            })
        }
    }

    

    return (
        <div>
            <Card>
                <form enctype="multipart/form-data">
                    <Stack spacing={6} sx={{ paddingBottom: "1rem" }}>
                        <Item>
                            <Stack alignItems={`center`} spacing={1}>
                                <Item>
                                    <IconButton component="label">
                                        <input
                                            onChange={handleInputFile}
                                            hidden
                                            accept="image/*"
                                            multiple
                                            type="file"
                                            max={20}
                                        />
                                        {
                                            profileImageURL ? <Avatar sx={{ width:'9rem', height:'9rem' }} src={profileImageURL}/> : 
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
                                                onChange={handleInputFile}
                                                hidden
                                                accept="image/*"
                                                multiple
                                                type="file"
                                            />
                                        </Button>
                                    </Item>
                                    <Item>
                                        <Button
                                            sx={{  width: "100%", textTransform: "none" }}
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            size='small'
                                            onClick={() => {
                                                setProfileImage(null);
                                                setProfileImageURL("");
                                                setImageSizeError(false);
                                            }}
                                            >
                                            Remove photo
                                        </Button>
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

export default SideBarCard
