import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
    Container,
    Grid,
    Box,
    Paper,
    FormControl,
    TextField,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    Stack,
    Card,
    Typography,
    IconButton,
    Chip,
    Autocomplete,
    CircularProgress,
    Checkbox,
    
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Item } from "semantic-ui-react";
import axios from 'axios';
import { toast } from "react-toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

let Tags = [];

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

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
}
const EditorForm = () => {
    const [title, setTitle] = useState('');
    // this value is for editor
    const [editorValue, setEditorValue] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
    
        if (!loading) {
        return undefined;
        }
    
        (async () => {
        await sleep(1e3); // For demo purposes.
    
        if (active) {
            setOptions([...Tags]);
        }
        })();
    
        return () => {
        active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const loadTags = async () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/v1/blog/tags/",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((result) => {
            // console.log(result.data.data);
            let data = result.data.data;
            for (let i = 0; i < data.length; i++) {
                Tags.push(data[i]);
            }
            console.log("The Tags is: ", Tags);
        }).catch((error) => {
            toast.error("Something went wrong while fetching tags.")
        })
    }

    useEffect(() => {
        loadTags();
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        console.log(editorValue);
        let isDataValid = true;
        if (!title) {
            toast.error("Please select a title for your post.");
            isDataValid = false;
        }
        if (!editorValue) {
            toast.error("No content!?");
            isDataValid = false;
        }
        if (isDataValid) {
            axios({
                method: "post",
                url: "",
                headers: {
                    
                },
                data: {
                    
                },
                }).then((res) => {
                    
                });
        }
    }

    // onChange expects a function with these 4 arguments
    function handleChangeEditorContent(content, delta, source, editor) {
        setEditorValue(editor.getContents());
    }
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
                                                required
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
                                            <ReactQuill modules={modules} theme="snow" value={editorValue} placeholder="Content goes here ..." onChange={handleChangeEditorContent} style={{ width: "65rem", height: "25rem" }}/>
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
                                        <FormControl s>
                                            <Autocomplete
                                                multiple
                                                id="tags-outlined"
                                                open={open}
                                                onOpen={() => {
                                                    setOpen(true);
                                                }}
                                                onClose={() => {
                                                    setOpen(false);
                                                }}
                                                // isOptionEqualToValue={(option, value) => option.title === value.title}
                                                loading={loading}
                                                options={Tags}
                                                getOptionLabel={(option) => option.tag_name}
                                                filterSelectedOptions
                                                sx={{ width: "50rem" }}
                                                size="small"
                                                disableCloseOnSelect
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
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
        </div>
    )
}

export default EditorForm
