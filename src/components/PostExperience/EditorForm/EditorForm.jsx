import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
    Divider,Box
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Item } from "semantic-ui-react";
import axios from 'axios';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import ImageCompress from 'quill-image-compress';
import ImageResize  from 'quill-image-resize-module-react';
import Mentions from '../MentionList/MentionList'
import {useMentionInPosts} from '../../../hooks/useMentionInPosts'
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
const EditorForm = () => {
    let allData;
    let access_token;
    let username;
    if (localStorage.getItem('tokens'))
    {
        allData = JSON.parse(localStorage.getItem('tokens'));
        access_token = allData.access;
        username = allData.username;
    }
    let announcement_id = useParams();
    console.log(announcement_id.announcement_id)
    const {mentionPosts,mentions} =useMentionInPosts() ;
   
    useEffect(()=>{mentionPosts(announcement_id.announcement_id)},[])


    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState('');
    // this value is for editor
    const [editorValue, setEditorValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);
    const loadTags = async () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/v1/blog/tags/",
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
        if (isDataValid) {
            axios({
                method: "post",
                url: "http://127.0.0.1:8000/api/v1/blog/userpost/",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                data: {
                    blog_title: title,
                    json_data: editorValue,
                    tags: tagIDs,
                    annoncement:announcement_id.announcement_id
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

    console.log("++++++++ The selected tags are: ++++++++", selectedTags);


    return (
        <div>
            <Card dir='ltr'>
                <form>
                
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                            {/*Mentions */}
                            <Grid item xs={12} direction='row'>
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
                            {/* Tags*/}
                            <Grid item xs={12}>
                                <Stack direction="column" spacing={0.5} sx={{ mt: "2rem" }}>
                                    <Grid item xs={7}>
                                   
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
                </form>
            </Card>
        </div>
    )
}

export default EditorForm
