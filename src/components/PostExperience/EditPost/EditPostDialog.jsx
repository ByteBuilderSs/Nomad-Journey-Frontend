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
    Container,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Chip
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
import { blue, deepOrange } from '@mui/material/colors';
import {makeStyles} from "@mui/styles";
import { useCounter, useCounterActions } from '../../../Context/CounterProvider';


const styles = makeStyles(theme => ({
    text_field:{
        borderRadius:"15px",
        "& fieldset": { border:"none"}
    },
    button:{
        width:"13vw",
        backgroundColor:"#EFEFD0",
        backgroundPosition:"right bottom",
        fontWeight:"bold",
        color:"#004E89",
        border:"solid 2px #004E89",
        borderRadius:"15px",
        transition:"all 0.15s ease-out",
        // display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            backgroundColor:"#004E89",
            color:"#EFEFD0"
        }
    },
    deleteButton:{
        width:"13vw",
        backgroundColor:"#EFEFD0",
        backgroundPosition:"right bottom",
        fontWeight:"bold",
        color:"#DE3733",
        border:"solid 2px #DE3733",
        borderRadius:"15px",
        transition:"all 0.15s ease-out",
        // display:"block",
        backgroundSize:"200% 100%",
        "&:hover":{
            backgroundPosition:"left bottom",
            backgroundColor:"#DE3733",
            color:"#EFEFD0"
        }
    }
}))

const scrollStyles = {
    /* width */
    '::-webkit-scrollbar': {
        width: '12px',
    },
    
    /* Track */
    '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    
    /* Handle */
    '::-webkit-scrollbar-thumb': {
        background: '#888',
    },
    
    /* Handle on hover */
    '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    }
};

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


const EditPostDialog = (props) => {
    const classes = styles();
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState('');
    // this value is for editor
    const [editorValue, setEditorValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    // const [createdDate, setCreatedDate] = useState(null);
    // const [editedDate, setEditedDate] = useState(null);
    const [scroll, setScroll] = React.useState('paper');
    const [tags, setTags] = useState([]);

    const [mainImage, setMainImage] = useState('');
    const [summary, setSummary] = useState('');
    const [imageSizeErr, setImageSizeErr] = useState(false);

    const counter = useCounter();
    const setCounter = useCounterActions();

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

    let tags_object = [];
    console.log("THE POST SLUG IN EDIT DIALOG IS: ", props.post_slug);

    const loadPostInfo = async () => {
        axios({
            method: "get",
            url: `https://api.nomadjourney.ir/api/v1/blog/post/${props.post_slug}`,
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

        }).catch((error) => {
            toast.error("Something went wrong while fetching post info.")
        })
    };  

    useEffect(() => {
        loadTags();
        if (props.post_slug)
        {
            loadPostInfo();
        }
    }, [props.post_slug]);

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
                url: `https://api.nomadjourney.ir/api/v1/blog/others-profile-post/${username}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: {
                    uid: props.post_id,
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
                    // slug = res.data.data.slug;
                    // console.log("------------- THE SLUG AFTER EDITING POST IS ------------- ", slug);
                    setCounter(counter + 1);
                    props.closePost();
                }).catch((error) => {
                    toast.error("Something went wrong while updating the post.");
                });
            
        }
    }

    function onCancel(e) {
        e.preventDefault();
        props.setOpen(false);
        props.setClose(true);
    }
    const handleClose = () =>
    {
        props.setOpen(false);
        props.setClose(true);
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

    // for image loader
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef();
    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    return (
        <div>
            <Dialog
                onHide={handleClose}
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'xl'}
                scroll={scroll}
                PaperProps={{ sx: {
                    borderRadius: "15px",
                    color:"#004E89",
                    boxShadow:"inset 0px 0px 0px 8px #004E89",
                    } }}
            >
                <DialogContent  dir='ltr'>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <form dir='ltr'>
                            <Grid container rowSpacing={0.25} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <div style={{ paddingLeft: "3rem" }}>
                                    <Grid item xs={12}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <Stack direction={'column'} sx={{ flexGrow: 1 }}>
                                                {/* Main Image */}
                                                <Item>
                                                    {/* Main Image */}
                                                    <Grid item xs={12} style={{ marginLeft: "-0.25rem", marginTop: "2rem" }}>
                                                        <div>
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
                                                                        width: "70.5rem",
                                                                        height: 340,
                                                                        borderRadius: '15px',
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
                                                                    marginLeft: "1rem",
                                                                    marginTop: "-1.5rem",
                                                                    textTransform: 'none',
                                                                    zIndex: 1
                                                                }}
                                                                className={classes.button}
                                                                component="label"
                                                                startIcon={<CameraAltIcon />}
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
                                                                    top: -35,
                                                                    left: 40,
                                                                    marginTop: '-12px',
                                                                    marginLeft: '-12px',
                                                                    zIndex: 1
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                        <Box sx={{ position: 'relative', ml: "12rem", mt: '-1.7rem' }}>
                                                        {mainImage && mainImage !== ''  && !loading ? (
                                                            <>
                                                            <Button
                                                                style={{
                                                                    bottom: "35px",
                                                                    marginLeft: "4rem",
                                                                    marginTop: "-1rem",
                                                                    textTransform: 'none',
                                                                    zIndex: 1
                                                                }}
                                                                className={classes.deleteButton}
                                                                variant="contained"
                                                                component="label"
                                                                startIcon={<RemoveCircleIcon />}
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
                                                </Item>
                                            </Stack>
                                        </div>
                                    </Grid>
                                    {/* Title */}
                                    <Grid item xs={12}>
                                        <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                            <Item>
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
                                                        className={classes.text_field}
                                                        id="outlined-adornment-title"
                                                        InputLabelProps={{
                                                            style: { color: 'rgba(0,78,137,0.6)',fontWeight: "bold" }
                                                        }}
                                                        InputProps={{
                                                            style: { color: '#004E89',
                                                                backgroundColor:"rgba(0,78,137,0.1)",
                                                                fontWeight:"bold",
                                                                border:"none"},
                                                            disableUnderline: true}}
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
                                    {/* Summary */}
                                    <Grid item xs={12}>
                                        <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                            <Item>
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
                                                        className={classes.text_field}
                                                        InputLabelProps={{
                                                            style: { color: 'rgba(0,78,137,0.6)',fontWeight: "bold" }
                                                        }}
                                                        InputProps={{
                                                            style: { color: '#004E89',
                                                                backgroundColor:"rgba(0,78,137,0.1)",
                                                                fontWeight:"bold",
                                                                border:"none"},
                                                            disableUnderline: true}}
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
                                                <b className="fields" style={{ paddingRight: "10rem", fontSize: 20 }}>Body</b>
                                            </Item>
                                            <Item>
                                                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                                    You can include all the amazing memories which you had during the journey!
                                                </Typography>
                                            </Item>
                                            <Item>
                                                <FormControl>
                                                    <ReactQuill modules={modules} theme="snow" value={editorValue} placeholder="Content goes here ..." onChange={handleChangeEditorContent} style={{ width: "70rem", height: "30rem" }}/>
                                                </FormControl>
                                            </Item>
                                        </Stack>
                                    </Grid>
                                    {/* Tags */}
                                    <Grid item xs={12}>
                                        <Stack direction="column" spacing={0.5} sx={{ mt: "3.5rem" }}>
                                            <Item>
                                                <b className="fields" style={{ paddingRight: "10rem", fontSize: 20 }}>Tags</b>

                                                {/* <h6 style={{ fontWeight: "bold", paddingRight: "10rem", marginTop: "3rem" }}>
                                                    Tags
                                                </h6> */}
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
                                </div>
                            </Grid>
                        </form>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Item>
                        <Button className={classes.button} sx={{mr: "1rem", mb: "1rem"}}
                            onClick={handleClose}
                            >
                                    Cancel
                        </Button>
                    </Item>
                    <Item>
                        <Button
                            sx={{ mr: "3rem", mb: "1rem" }}
                            className={classes.button}
                            onClick={onSubmit}
                            >
                            Edit
                        </Button>
                    </Item>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditPostDialog
