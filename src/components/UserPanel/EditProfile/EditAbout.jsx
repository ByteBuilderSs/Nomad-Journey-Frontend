import './EditAbout.css';
import React, { useEffect, useState } from 'react';
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
    Container,
    Tabs,
    Tab,
    Autocomplete,
    Chip,
    Checkbox,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Item } from "semantic-ui-react";
import axios from 'axios';
import { useParams } from 'react-router';
import LabelIcon from '@mui/icons-material/Label';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const theme = createTheme({
    palette: {
            secondary: 
            {
                main: '#8C8C8C',
            },
            primary: 
            {
                main: 'rgba(0, 0, 0, 0.87)'
            }
        }
});


const EditAbout = () => {
    const navigate = useNavigate();
    const allData = JSON.parse(localStorage.getItem('tokens'));
    const access_token = allData.access;
    const username = allData.username;
    console.log("The username is: ", username);

    const [hostAvailability, setHostAvailability] = useState("");
    const [hometown, setHometown] = useState("");
    const [occupation, setOccupation] = useState("");
    const [education, setEducation] = useState("");
    const [selectedLangsL, setSelectedLangsL] = useState([]);
    const [selectedLangsF, setSelectedLangsF] = useState([]);
    const [aboutme, setAboutme] = useState("");
    const [why, setWhy] = useState("");
    const [interests, setInterests] = useState([]);
    const [interestValue, setInterestValue] = useState("");
    const [favs, setFavs] = useState("");
    const [amaz, setAmaz] = useState("");
    const [TLS, setTLS] = useState("");
    const [share, setShare] = useState("");

    const [languages, setLanguages] = useState([]);

    const loadLanguages = async () => {
        axios({
            method: "get",
            url: "http://188.121.102.52:8000/api/v1/accounts/GetLanguages",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            setLanguages(result.data.data);
            console.log("********** The Languages are ******** ", languages);
        }).catch((error) => {
            toast.error("Something went wrong while fetching languages.", error);
        })
    }

    useEffect(() => {
        loadLanguages();
    }, []);

    const addInterest = (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            let _items = [...interests];
            _items.push(event.target.value);

            setInterests(_items);
            setInterestValue("");
        }
    };

    const removeInterest = (item) => {
        const _items = interests.filter((x) => x !== item);
        setInterests(_items);
    };

    const loadAboutMeInfo = async () => {
        axios({
            method: "get",
            url: `http://188.121.102.52:8000/api/v1/accounts/GetUserProfileForOverview/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            {/* TODO */}
            const userInfo = result.data.data;
            setHostAvailability(userInfo.hosting_availability);
            setHometown(userInfo.hometown);
            setOccupation(userInfo.User_job);
            setEducation(userInfo.User_education);
            let langsL = [];
            let langsF = [];
            for (let i = 0; i < userInfo.langF_name.length; i++)
            {
                langsF.push({id: userInfo.langF[i], language_name: userInfo.langF_name[i]});
            }
            setSelectedLangsF(langsF);
            for (let i = 0; i < userInfo.langL_name.length; i++)
            {
                langsL.push({id: userInfo.langL[i], language_name: userInfo.langL_name[i]});
            }
            setSelectedLangsL(langsL);
            setAboutme(userInfo.User_about_me);
            setWhy(userInfo.why_Im_on_nomadjourney);
            setInterests(userInfo.intrest_name);
            setFavs(userInfo.favorite_music_movie_book);
            setAmaz(userInfo.amazing_thing_done);
            setTLS(userInfo.teach_learn_share);
            setShare(userInfo.what_Ican_share_with_host);
        }).catch((error) => {
            toast.error("Something went wrong while fetching data.");
            console.log(error);
        })
    }

    useEffect(() => {
        loadAboutMeInfo();
    }, []);

    const handleLLSelection = (values) => {
        setSelectedLangsL(values);
    }

    const handleLFSelection = (values) => {
        setSelectedLangsF(values);
    }

    const handleChangeHostingAvailablity = (event) => {
        setHostAvailability(event.target.value);
    }

    const handleChangeHometown = (event) => {
        setHometown(event.target.value);
    }

    const handleChangeOccupation = (event) => {
        setOccupation(event.target.value);
    }

    const handleChangeEducation = (event) => {
        setEducation(event.target.value);
    }

    const handleChangeFavs = (event) => {
        setFavs(event.target.value);
    }

    const handleChangeAmaz = (event) => {
        setAmaz(event.target.value);
    }

    const handleChangeTLS = (event) => {
        setTLS(event.target.value);
    }

    const handleChangeShare = (event) => {
        setShare(event.target.value);
    }

    const handleChangeAboutMe = (event) => {
        setAboutme(event.target.value);
    }

    const handleChangeWhy = (event) => {
        setWhy(event.target.value);
    }

    console.log("************** THE SELECTED FLUENT LANGUAGES ARE ********************* ", selectedLangsF);
    console.log("++++++++++++++ THE SELECTED LEARNING LANGUAGES ARE ++++++++++++++++++++ ", selectedLangsL);

    const onSubmit = async (event) => {
        event.preventDefault();

        let langF_IDs = []
        for (let i = 0; i < selectedLangsF.length; i++)
        {
            langF_IDs.push(selectedLangsF[i].id);
        }

        let langL_IDs = []
        for (let i = 0; i < selectedLangsL.length; i++)
        {
            langL_IDs.push(selectedLangsL[i].id);
        }

        axios({
            method: "patch",
            url: `http://188.121.102.52:8000/api/v1/accounts/UserProfileEdit3/${username}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            data : {
                hosting_availability: hostAvailability,
                hometown: hometown,
                User_job: occupation,
                User_education: education,
                User_about_me: aboutme,
                why_Im_on_nomadjourney: why,
                favorite_music_movie_book: favs,
                amazing_thing_done: amaz,
                teach_learn_share: TLS,
                what_Ican_share_with_host: share,
                interests: interests,
                langF: langF_IDs,
                langL: langL_IDs
            }
        }).then((res) => {
            console.log(res);
            navigate(`/home/Profile/${username}/`);
            toast.success("Changes updated successfully.");
        }).catch((error) => {
            toast.error("Something went wrong while updating information.");
            console.log(error);
        })
    }

    const onCancel = async (event) => {
        event.preventDefault();
        loadAboutMeInfo();
    }
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <form>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <div style={{ paddingLeft: "2.5rem" }}>
                            {/* Hosting Availability */}
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                        Hosting Availability
                                    </h6>
                                    <FormControl sx={{ width: "15rem" }}>
                                        <Select
                                            // defaultValue={"Not Accepting Guests"}
                                            labelId="hosting-availability-label"
                                            id="hosting-availability"
                                            sx={{ height: "2rem" }}
                                            value={hostAvailability}
                                            onChange={handleChangeHostingAvailablity}
                                        >
                                            <MenuItem value={`Accepting Guests`}>Accepting Guests</MenuItem>
                                            <MenuItem value={`Maybe Accepting Guests`}>Maybe Accepting Guests</MenuItem>
                                            <MenuItem value={`Not Accepting Guests`}>Not Accepting Guests</MenuItem>
                                            <MenuItem value={`Wants to Meet Up`}>Wants to Meet Up</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Divider sx={{ width: "100rem", borderBottomWidth: 3, mt: "1rem" }}/>
                                </Box>
                            </Grid>
                            {/* Hometown */}
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    mt: "1rem"
                                }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "11.5rem" }}>
                                        Where I Grew Up
                                    </h6>
                                    <FormControl>
                                        <TextField
                                            sx={{ width: "30rem" }}
                                            id="outlined-adornment-firstname"
                                            type={"text"}
                                            placeholder='e.g. Italy'
                                            size='small'
                                            value={hometown}
                                            onChange={handleChangeHometown}
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                            {/* Occupation */}
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    mt: "1rem"
                                }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "13.8rem" }}>
                                        Occupation
                                    </h6>
                                    <FormControl>
                                        <TextField
                                            sx={{ width: "30rem" }}
                                            id="outlined-adornment-firstname"
                                            type={"text"}
                                            size='small'
                                            value={occupation}
                                            onChange={handleChangeOccupation}
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                            {/* Education */}
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    mt: "1rem"
                                }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "14.4rem" }}>
                                        Education
                                    </h6>
                                    <FormControl>
                                        <TextField
                                            sx={{ width: "30rem" }}
                                            id="outlined-adornment-firstname"
                                            type={"text"}
                                            size='small'
                                            value={education}
                                            onChange={handleChangeEducation}
                                        />
                                    </FormControl>
                                </Box>
                                <Divider sx={{ borderBottomWidth: 3, mb: "1rem", mt: "1rem" }} />
                            </Grid>
                            {/* TODO => Languages I'm Fluent In */}
                            <Grid item xs={12}>
                                <p style={{ color: "#072147",  marginLeft: "0.1rem", marginBottom: "0.5rem" }}>You may type languages or search for them ...</p>
                                <Box sx={{ display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    mt: "1rem"
                                }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                        Languages I'm Fluent In
                                    </h6>
                                    <FormControl>
                                        <Autocomplete
                                            clearIcon={false}
                                            multiple
                                            id="lls-outlined"
                                            options={languages}
                                            value={selectedLangsF}
                                            isOptionEqualToValue={(option, value) => option.language_name === value.language_name}
                                            getOptionSelected={(option, value) => {
                                                return option.language_name === value.language_name;
                                            }}
                                            getOptionLabel={(option) => option.language_name}
                                            sx={{ width: "50rem" }}
                                            size="small"
                                            disableCloseOnSelect
                                            noOptionsText="No related language is available"
                                            onChange={(e, values) => {
                                                handleLFSelection(values);
                                            }}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={
                                                            selected
                                                        }
                                                    />
                                                    {option.language_name}
                                                </li>
                                            )}
                                            style={{ width: 500 }}
                                            renderInput={(params) => (
                                                <TextField {...params} label=""  />
                                            )}
                                            ListboxProps={
                                                {
                                                    style:{
                                                        maxHeight: '10rem',
                                                    }
                                                }
                                            }
                                        />
                                    </FormControl>
                                </Box>
                            </Grid>
                            {/* TODO => Languages I'm Learning */}
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex",
                                    alignContent: "center",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    mt: "1rem",
                                    mb: "1rem"
                                }}>
                                    <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                        Languages I'm Learning
                                    </h6>
                                    <FormControl>
                                        <Autocomplete
                                            clearIcon={false}
                                            multiple
                                            id="tags-outlined"
                                            options={languages}
                                            value={selectedLangsL}
                                            isOptionEqualToValue={(option, value) => option.language_name === value.language_name}
                                            getOptionSelected={(option, value) => {
                                                return option.language_name === value.language_name;
                                            }}
                                            getOptionLabel={(option) => option.language_name}
                                            sx={{ width: "50rem" }}
                                            size="small"
                                            disableCloseOnSelect
                                            noOptionsText="No related language is available"
                                            onChange={(e, values) => {
                                                handleLLSelection(values);
                                            }}
                                            renderOption={(props, option, { selected }) => (

                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={
                                                            selected
                                                        }
                                                    />
                                                    {option.language_name}
                                                </li>
                                            )}
                                            style={{ width: 500 }}
                                            renderInput={(params) => (
                                                <TextField {...params} label=""  />
                                            )}
                                        />
                                    </FormControl>
                                </Box>
                                <Divider  sx={{ borderBottomWidth: 3, mb: "1rem" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ width: '100%' }}>
                                    <Stack spacing={3}>
                                        {/* About Me */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                About Me
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={8}
                                                    maxRows={10}
                                                    value={aboutme}
                                                    onChange={handleChangeAboutMe}
                                                />
                                            </FormControl>
                                        </Item>
                                        {/* Why I'm on Nomad Journey */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                Why I'm on Nomad Journey
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={8}
                                                    maxRows={10}
                                                    value={why}
                                                    onChange={handleChangeWhy}
                                                />
                                            </FormControl>
                                        </Item>
                                        {/* My Interests */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold",
                                                paddingRight: "8rem",
                                                display: "flex",
                                                alignItems: "center",
                                                alignContent: "center" }}>
                                                <LabelIcon sx={{ mr: "0.5rem" }}/>
                                                My Interests
                                            </h6>
                                            <FormControl>
                                                <p style={{ color: "#072147",  marginLeft: "0.1rem", marginBottom: "0.5rem" }}>You may name five  things, which your are interested in ...</p>
                                                <div className="wrapper">
                                                    {interests.map((item) => (
                                                        <div className="chip" style={{ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
                                                            {item}
                                                            <span onClick={() => removeInterest(item)}><HighlightOffIcon size="large" color='secondary' /></span>
                                                        </div>
                                                    ))}
                                                    <input
                                                        value={interestValue}
                                                        onChange={(e) => setInterestValue(e.target.value)}
                                                        type="text"
                                                        className={"myInput"}
                                                        onKeyDown={addInterest}
                                                    />
                                                </div>
                                            </FormControl>
                                        </Item>
                                        {/* My Favorite Music, Movies & Books */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                My Favorite Music, Movies & Books
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={8}
                                                    maxRows={10}
                                                    value={favs}
                                                    onChange={handleChangeFavs}
                                                />
                                            </FormControl>
                                        </Item>
                                        {/* One Amazing Thing I’ve Done */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                One Amazing Thing I’ve Done
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={8}
                                                    maxRows={10}
                                                    value={amaz}
                                                    onChange={handleChangeAmaz}
                                                />
                                            </FormControl>
                                        </Item>
                                        {/* Teach, Learn, Share */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                Teach, Learn, Share
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={8}
                                                    maxRows={10}
                                                    value={TLS}
                                                    onChange={handleChangeTLS}
                                                />
                                            </FormControl>
                                        </Item>
                                        {/* What I Can Share with Hosts */}
                                        <Item>
                                            <h6 style={{ fontWeight: "bold", paddingRight: "8rem" }}>
                                                What I Can Share with Hosts
                                            </h6>
                                            <FormControl sx={{ width: "56rem" }}>
                                                <TextField
                                                    id="edit-profile-aboutme"
                                                    name="aboutme"
                                                    type="text"
                                                    multiline
                                                    fullWidth="true"
                                                    size="medium"
                                                    rows={8}
                                                    maxRows={10}
                                                    value={share}
                                                    onChange={handleChangeShare}
                                                />
                                            </FormControl>
                                        </Item>
                                    </Stack>
                                </Box>
                            </Grid>

                            {/* Confirm Button */}
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
                                    <Item>
                                        <Button
                                            variant="contained"
                                            sx={{ width: "100%" }}
                                            type="submit"
                                            // disabled={disabled}
                                            color='success'
                                            onClick={onSubmit}
                                        >
                                            Update
                                        </Button>
                                    </Item>
                                    <Item>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                            }}
                                            type="submit"
                                            // disabled={disabled}
                                            onClick={onCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </Item>
                                </Stack>
                            </Grid>
                        </div>
                    </Grid>
                </form>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default EditAbout;