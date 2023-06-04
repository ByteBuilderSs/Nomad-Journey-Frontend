import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../BlogForm.css';
import {
    Grid,
    FormControl,
    TextField,
    Button,
    Stack,
    Card,
    Typography,
    Autocomplete,
    Checkbox,
    Divider,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    CircularProgress,
    Fab,
    Box,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Item } from "semantic-ui-react";
import axios from 'axios';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import ImageCompress from 'quill-image-compress';
import ImageResize  from 'quill-image-resize-module-react';
import Mentions from '../MentionList/MentionList';
import {useMentionInPosts} from '../../../hooks/useMentionInPosts';
import SamplePostMainImage from '../../../Assets/images/post-default-main-image.jpg';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, teal } from '@mui/material/colors';
import { convertFileToBase64 } from '../../../utils/utils';
import { blue, deepOrange } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: 
        {
            main: '#ffd180'
        }
        }
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
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
const EditorForm = () => {
    let announcement_id = useParams();
    console.log(announcement_id.announcement_id)
    const {mentionPosts, mentions} = useMentionInPosts() ;

    useEffect(()=>{mentionPosts(announcement_id.announcement_id)},[])


    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState('');
    /* TODO => useState for main image and summary */
    const [mainImage, setMainImage] = useState('');
    const [summary, setSummary] = useState('');
    const [imageSizeErr, setImageSizeErr] = useState(false);
    // this value is for editor
    const [editorValue, setEditorValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);

    // for image loader
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef();
    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const loadTags = async () => {
        axios({
            method: "get",
            url: "https://api.nomadjourney.ir/api/v1/blog/tags/",
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

    useEffect(() => {
        loadTags();
        
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
        if (imageSizeErr) {
            isDataValid = false;
        }
        
        if (isDataValid) {
            axios({
                method: "post",
                url: `https://api.nomadjourney.ir/api/v1/blog/others-profile-post/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: {
                    blog_title: title,
                    json_data: editorValue,
                    tags: tagIDs,
                    annoncement:announcement_id.announcement_id,
                    main_image_64: mainImage,
                    description: summary
                },
                }).then((res) => {
                    console.log("+++++ THE RESULT AFTER CREATING THE POST IS +++++ ", res.data);
                    setDisabled(true);
                    setTimeout(() => {
                        setDisabled(false);
                    }, 5000);
                    toast.success("A new post created successfully.");
                    setTitle('');
                    setEditorValue('');
                    setImageSizeErr(false);
                    setSummary('');
                    setMainImage('');
                    setSelectedTags([]);
                    navigate(`/home/Profile/${username}/`)
                }).catch((error) => {
                    toast.error("Something went wrong.")
                });
        }
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
            if (!loading) {
                setLoading(true);
                timer.current = window.setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
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
            <div>
                <Card dir='ltr' style={{ borderRadius: "15px" }}>
                    <form>
                    <CardContent>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {/* Main Image */}
                            <Grid item xs={12} style={{ paddingLeft: "5rem" }}>
                                <div >
                                    <IconButton component="label" disabled={loading}>
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
                                                width: "70.5rem",
                                                height: 340,
                                                borderRadius: '0.25rem',
                                                objectFit: 'fill',
                                                objectPosition: "center"
                                            }}
                                        />
                                        {loading && (
                                            <CircularProgress
                                                size={50}
                                                sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                                }}
                                            />
                                            )}
                                    </IconButton>
                                </div>
                                <Box sx={{ position: 'relative' }}>
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
                                        disabled={loading}
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
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                            position: 'absolute',
                                            top: -27,
                                            left: 85,
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Box>
                                {/* TODO => button for removing the photo */}
                                <Box sx={{ position: 'relative', ml: "12rem", mt: '-1.7rem' }}>
                                    {mainImage && mainImage !== ''  && !loading ? (
                                        <>
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
                                            disabled={loading}
                                            onClick={() => {
                                                if (!loading) {
                                                    setLoading(true);
                                                    timer.current = window.setTimeout(() => {
                                                        setLoading(false);
                                                    }, 2000);
                                                }
                                                setMainImage('');
                                                setImageSizeErr(false);
                                            }}
                                            >
                                            Remove photo
                                        </Button>
                                        {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                            }}
                                        />
                                        )}
                                        </>
                                    ) : null}
                                </Box>
                            </Grid>
                            <div style={{ paddingLeft: "5rem" }}>
                                {/* Title */}
                                <Grid item xs={12}>
                                    <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                        <Item>
                                            {/* <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                Title
                                            </h6> */}
                                            <b className="fields" style={{ paddingRight: "10rem", fontSize: 20 }}>Title</b>
                                        </Item>
                                        <Item>
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                Please select an appropriate title for your post
                                            </Typography>
                                        </Item>
                                        <Item>
                                            <FormControl>
                                                <TextField
                                                    sx={{ width: "70rem" }}
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
                                {/* Mentions (HOST)*/}
                                <Grid item xs={12} direction='row'>
                                    <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                        <Item>
                                            {/* <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                Your host name in this trip was:
                                            </h6> */}
                                            <b className="fields" style={{ paddingRight: "10rem", fontSize: 20 }}>Your host in this trip was</b>
                                        </Item>
                                        <Item>
                                            <FormControl>
                                                <Mentions props={mentions}/>
                                            </FormControl>
                                        </Item>
                                    </Stack>
                                </Grid>
                                {/* Summary */}
                                <Grid item xs={12}>
                                    <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                        <Item>
                                            {/* <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                Summary
                                            </h6> */}
                                            <b className="fields" style={{ paddingRight: "10rem", fontSize: 20 }}>Summary</b>
                                        </Item>
                                        <Item>
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                Please write a summary for your post in few lines
                                            </Typography>
                                        </Item>
                                        <Item>
                                            <FormControl>
                                                <TextField
                                                    sx={{ width: "70rem" }}
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
                                    <Stack direction="column" spacing={0.5} sx={{ mt: "2rem", mb: "2rem" }}>
                                        <Item>
                                            {/* <h6 style={{ fontWeight: "bold", paddingRight: "10rem" }}>
                                                Body
                                            </h6> */}
                                            <b className="fields" style={{ paddingRight: "10rem", fontSize: 20 }}>Body</b>
                                        </Item>
                                        <Item>
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                You can include all the amazing memories which you had during the journey!
                                            </Typography>
                                        </Item>
                                        <Item>
                                            <FormControl>
                                                <ReactQuill 
                                                    modules={modules} 
                                                    theme="snow" 
                                                    value={editorValue} 
                                                    placeholder="Content goes here ..." 
                                                    onChange={handleChangeEditorContent} 
                                                    style={{ width: "70rem", height: "30rem" }}/>
                                            </FormControl>
                                        </Item>
                                    </Stack>
                                </Grid>
                                {/* Tags*/}
                                <Grid item xs={12}>
                                    <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                        <Grid item xs={7}>
                                    
                                        <Item>
                                            <h6 className="fields" style={{ fontWeight: "bold", paddingRight: "10rem", marginTop: "3rem", fontSize: 20 }}>
                                                Tags
                                            </h6>
                                            {/* <b className="fields" style={{ paddingRight: "10rem", fontSize: 20, paddingRight: "10rem", marginTop: "14rem" }}>Tags</b> */}
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
                                        </Grid>                        
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
                                                Add New Post
                                            </Button>
                                        </Item>
                                        {/* <Item>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    width: "100%",
                                                }}
                                                type="submit"
                                                onClick={onCancel}
                                            >
                                                Cancel
                                            </Button>
                                        </Item> */}
                                    </Stack>
                                </Grid>
                            </div>
                        </Grid>
                    </CardContent>
                    </form>
                </Card>
            </div>
        </ThemeProvider>
    )
}

export default EditorForm
