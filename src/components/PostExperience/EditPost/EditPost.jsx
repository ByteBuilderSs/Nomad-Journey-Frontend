import React from 'react';
import '../PostDetail/PostDetail.css';
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
    Card,
    IconButton,
    Typography,
    Checkbox,
    Autocomplete,
    Container
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReactQuill, { Quill } from 'react-quill';
import { Item } from "semantic-ui-react";
import { useParams } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import  { DateObject } from "react-multi-date-picker";
import ImageCompress from 'quill-image-compress';
import ImageResize  from 'quill-image-resize-module-react';
import { convertFileToBase64 } from '../../../utils/utils';
import SamplePostMainImage from '../../../Assets/images/post-default-main-image.jpg';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, teal } from '@mui/material/colors';

const theme = createTheme({
    palette: {
            secondary: 
            {
                main: teal[900]
            }
        }
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
Quill.register('modules/imageCompress', ImageCompress);
Quill.register('modules/imageResize', ImageResize);

const modules = {
    toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image"],
        ["clean"],
    ],
    imageCompress :{
        quality: 0.9, // default
        maxWidth: 500, 
        maxHeight: 500, 
        imageType: ['image/jpeg', 'image/gif', 'image/jpeg', 'image/png', 'image/svg', 'image/webp', 'image/bmp', 'image/vnd'], // default
        debug: true, // default
        suppressErrorLogging: false, // default
        insertIntoEditor: undefined, // default
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
    }

}

let allData;
let access_token;
let username;
if (localStorage.getItem('tokens'))
{
    allData = JSON.parse(localStorage.getItem('tokens'));
    access_token = allData.access;
    username = allData.username;
}

const EditPost = () => {
    let {uid, slug} = useParams();
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState('');
    // this value is for editor
    const [editorValue, setEditorValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    // const [createdDate, setCreatedDate] = useState(null);
    // const [editedDate, setEditedDate] = useState(null);

    const [tags, setTags] = useState([]);

    const [mainImage, setMainImage] = useState('');
    const [summary, setSummary] = useState('');
    const [imageSizeErr, setImageSizeErr] = useState(false);

    const loadTags = async () => {
        axios({
            method: "get",
            url: "http://188.121.102.52:8000/api/v1/blog/tags/",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            setTags(result.data.data);
            console.log("********** The Tags are ******** ", tags);
        }).catch((error) => {
            toast.error("Something went wrong while fetching tags.")
        })
    }

    let tags_object = [];

    const loadPostInfo = async () => {
        axios({
            method: "get",
            url: `http://188.121.102.52:8000/api/v1/blog/post/${slug}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        }).then((result) => {
            console.log("********** THE POST INFO IS ******** ", result.data);
            const data = result.data;
            setTitle(data.blog_title);
            setEditorValue(data.json_data);
            setSummary(data.description);
            setMainImage(data.main_image_64);

            for (let i = 0; i < data.tags.length; i++)
            {
                tags_object.push({uid: data.tags[i], tag_name: data.tags_name[i]});
            }

            setSelectedTags(tags_object);

            // let c_time = new Date(data.created_at);
            // setCreatedDate(new DateObject({
            //     date: c_time,
            //     format: "YYYY/MM/DD, HH:MM:SS"
            // }).format("YYYY/MM/DD, HH:MM:SS"));

            // let u_time = new Date(data.updated_at);
            // setEditedDate(new DateObject({
            //     date: u_time,
            //     format: "YYYY/MM/DD, HH:MM:SS"
            // }).format("YYYY/MM/DD, HH:MM:SS"));

        }).catch((error) => {
            toast.error("Something went wrong while fetching post info.")
        })
    };  

    useEffect(() => {
        loadTags();
        loadPostInfo();
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        let tagIDs = []
        for (let i=0; i < selectedTags.length; i++)
        {
            tagIDs.push(selectedTags[i].uid);
        }
        let isDataValid = true;
        if (!title) {
            toast.error("Please select a title for your post.");
            isDataValid = false;
        }
        console.log("***** The editor content ****", editorValue.ops);
        if (imageSizeErr) {
            isDataValid = false;
        }

        if (editorValue.ops === undefined || 
            editorValue.ops.length == 0 || 
            !editorValue.ops[0].insert || 
            editorValue.ops[0].insert === undefined ||
            editorValue.ops[0].insert === null ||
            editorValue.ops[0].insert.length === 0 || 
            editorValue.ops[0].insert === "\n" || 
            editorValue.ops[0].insert === "\t" ||
            (editorValue.ops[0].insert && editorValue.ops[0].insert.trim().length === 0)) {
            toast.error("No content!?");
            isDataValid = false;
        }
        if (isDataValid) {
            axios({
                method: "patch",
                url: `http://188.121.102.52:8000/api/v1/blog/others-profile-post/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: {
                    uid: uid,
                    blog_title: title,
                    json_data: editorValue,
                    tags: tagIDs,
                    main_image_64: mainImage,
                    description: summary 
                },
                }).then((res) => {
                    setDisabled(true);
                    setTimeout(() => {
                        setDisabled(false);
                    }, 5000);
                    toast.success("Post updated successfully.");
                    console.log("************* THE RESULT AFTER UPDATE IS ************** ", res.data);
                    slug = res.data.data.slug;
                    console.log("------------- THE SLUG AFTER EDITING POST IS ------------- ", slug);
                    navigate(`/home/PostExperience/PostDetail/${slug}`);
                }).catch((error) => {
                    toast.error("Something went wrong while updating the post.");
                });
            
        }
    }

    function onCancel(e) {
        e.preventDefault();
        navigate(`/home/PostExperience/PostDetail/${slug}`);
    }
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
    // onChange expects a function with these 4 arguments
    const handleChangeEditorContent = (content, delta, source, editor) => {
        setEditorValue(editor.getContents());
    }
    // select tag
    const handleTagSelection = (values) => {
        console.log("********** The value is: ***********", values);
        setSelectedTags(values);
    }

    /* TODO => handleChange for main image */
    const handleMainImage = async (e) => {
        const file = e.target.files[0];
        const size_mb = file.size / 1024 ** 2;
        const size_kb = size_mb * 1000;
        if (size_kb <= 500) {
            const base64Image = await convertFileToBase64(file);
            setImageSizeErr(false);
            setMainImage(base64Image ? base64Image : "");
        } else {
            setImageSizeErr(true);
            toast.warning("Image size can not be more than 500kb.");
        }
    }

    const handleChangeSummary = (event) => {
        setSummary(event.target.value);
    }

    console.log("++++++++ The selected tags are: ++++++++", selectedTags);

    return (
        <ThemeProvider theme={theme}>
            <>
                <div className='post-detail'>
                    <Container style={{ paddingTop: "3rem", paddingBottom: "2rem"}}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card dir='ltr'>
                                <form>
                                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        {/* Main Image */}
                                        <Grid item xs={12} style={{ paddingLeft: "10rem", marginTop: "4rem" }}>
                                            <div >
                                                <IconButton component="label">
                                                    <input
                                                        onChange={(e) => handleMainImage(e)}
                                                        hidden
                                                        accept="image/*"
                                                        multiple
                                                        type="file"
                                                        max={20}
                                                    />
                                                    <img
                                                        variant="square"
                                                        src={mainImage && mainImage !== '' ? mainImage : SamplePostMainImage} 
                                                        style={{
                                                            width: "60rem",
                                                            height: 340,
                                                            borderRadius: '0.25rem',
                                                            objectFit: 'fill',
                                                            objectPosition: "center"
                                                        }}
                                                    />
                                                </IconButton>
                                            </div>
                                            <Button
                                                style={{
                                                    bottom: "35px",
                                                    marginLeft: "1.25rem",
                                                    marginTop: "-0.65rem",
                                                    textTransform: 'none'
                                                }}
                                                variant="contained"
                                                component="label"
                                                startIcon={<CameraAltIcon />}
                                                color='secondary'
                                                >
                                                Upload a photo
                                                <input
                                                    hidden
                                                    accept="image/*"
                                                    multiple
                                                    type="file"
                                                    onChange={(e) => handleMainImage(e)}
                                                /> 
                                            </Button>
                                            <Button
                                                style={{
                                                    bottom: "35px",
                                                    marginLeft: "0.5rem",
                                                    marginTop: "-0.65rem",
                                                    textTransform: 'none'
                                                }}
                                                variant="contained"
                                                component="label"
                                                startIcon={<RemoveCircleIcon />}
                                                color='error'
                                                onClick={() => {
                                                    setMainImage('');
                                                    setImageSizeErr(false);
                                                }}
                                                >
                                                Remove photo
                                            </Button>
                                        </Grid>
                                        <div style={{ paddingLeft: "10rem" }}>
                                            {/* Title */}
                                            <Grid item xs={12}>
                                                <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                                    <Item>
                                                        <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                            Title
                                                        </h6>
                                                    </Item>
                                                    <Item>
                                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                            Please select an appropriate title for your post
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <FormControl>
                                                            <TextField
                                                                sx={{ width: "65rem" }}
                                                                id="outlined-adornment-title"
                                                                type={"text"}
                                                                placeholder='e.g. My memories of a trip to the southern parts of Italy'
                                                                size='small'
                                                                value={title}
                                                                onChange={handleChangeTitle}
                                                                required
                                                            />
                                                        </FormControl>
                                                    </Item>
                                                </Stack>
                                            </Grid>
                                            {/* Host name */}
                                            {/* <Grid item xs={12} direction='row'>
                                                <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                                    <Item>
                                                        <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                            Your host name in this trip was:
                                                        </h6>
                                                    </Item>
                                                    <Item>
                                                        <FormControl>
                                                            <Mentions props={mentions}/>
                                                        </FormControl>
                                                    </Item>
                                                </Stack>
                                            </Grid> */}
                                            {/* Summary */}
                                            <Grid item xs={12}>
                                                <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                                    <Item>
                                                        <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                            Summary
                                                        </h6>
                                                    </Item>
                                                    <Item>
                                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                            Please write a summary for your post in few lines
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <FormControl>
                                                            <TextField
                                                                sx={{ width: "58.5rem" }}
                                                                id="outlined-adornment-summary"
                                                                type={"text"}
                                                                multiline
                                                                fullWidth="true"
                                                                size="medium"
                                                                rows={2}
                                                                maxRows={10}
                                                                value={summary}
                                                                onChange={handleChangeSummary}
                                                            />
                                                        </FormControl>
                                                    </Item>
                                                </Stack>
                                            </Grid>
                                            {/* Body */}
                                            <Grid item xs={12}>
                                                <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                                    <Item>
                                                        <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                            Body
                                                        </h6>
                                                    </Item>
                                                    <Item>
                                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                            You can include all the amazing memories which you had during the journey!
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <FormControl>
                                                            <ReactQuill modules={modules} theme="snow" value={editorValue} placeholder="Content goes here ..." onChange={handleChangeEditorContent} style={{ width: "65rem", height: "30rem" }}/>
                                                        </FormControl>
                                                    </Item>
                                                </Stack>
                                            </Grid>
                                            {/* Tags */}
                                            <Grid item xs={12}>
                                                <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                                    <Item>
                                                        <h6 style={{ fontWeight: "bold", paddingRight: "10rem", marginTop: "3rem" }}>
                                                            Tags
                                                        </h6>
                                                    </Item>
                                                    <Item>
                                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                            You can add some related tags to your post
                                                        </Typography>
                                                    </Item>
                                                    <Item>
                                                        <FormControl>
                                                            <Autocomplete
                                                                clearIcon={false}
                                                                multiple
                                                                id="tags-outlined"
                                                                options={tags}
                                                                value={selectedTags}
                                                                isOptionEqualToValue={(option, value) => option.tag_name === value.tag_name}
                                                                getOptionSelected={(option, value) => {
                                                                    return option.tag_name === value.tag_name;
                                                                }}
                                                                getOptionLabel={(option) => option.tag_name}
                                                                sx={{ width: "50rem" }}
                                                                size="small"
                                                                disableCloseOnSelect
                                                                noOptionsText="No related tag is available"
                                                                onChange={(e, values) => {
                                                                    handleTagSelection(values);
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
                                                                        {option.tag_name}
                                                                    </li>
                                                                    )}
                                                                    style={{ width: 500 }}
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} label="Tags"  />
                                                                    )}
                                                            />
                                                        </FormControl>
                                                    </Item>
                                                </Stack>
                                            </Grid>
                                            {/* Buttons */}
                                            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                                                <Stack direction="row" spacing={2} sx={{ mt: "5rem", mb: "1rem" }}>
                                                    <Item>
                                                        <Button
                                                            variant="contained"
                                                            sx={{ width: "100%", backgroundColor: "#088AD1" }}
                                                            type="submit"
                                                            onClick={onSubmit}
                                                            disabled={disabled}
                                                        >
                                                            Update
                                                        </Button>
                                                    </Item>
                                                    {/* TODO */}
                                                    <Item>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{
                                                                width: "100%",
                                                            }}
                                                            type="submit"
                                                            onClick={onCancel}
                                                            disabled={disabled}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Item>
                                                </Stack>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </form>
                            </Card>
                        </Grid>
                    </Container>
                </div>
            </>
        </ThemeProvider>
    )
}

export default EditPost
