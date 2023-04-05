import React, { useState } from 'react';
import ReactQuill from 'react-quill';
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
    Autocomplete
} from '@mui/material';
import { Item } from "semantic-ui-react";

const Tags = [
    { id: 1, name: "Food" },
    { id: 2, name: "Ancient" },
    { id: 3, name: "Cultural" },
    { id: 4, name: "Religion" },
]

const EditorForm = () => {
    // this value is for editor
    const [editorValue, setEditorValue] = useState('');

    return (
        <div>
            <Card dir='ltr'>
                <form>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <div style={{ paddingLeft: "2.9rem", paddingRight: "2.5rem" }}>
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
                                                sx={{ width: "59rem" }}
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
                                            <ReactQuill theme="snow" value={editorValue} onChange={setEditorValue} style={{ width: "58.9rem", height: "20rem" }}/>
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
                                                multiple
                                                id="tags-outlined"
                                                options={Tags}
                                                getOptionLabel={(option) => option.name}
                                                filterSelectedOptions
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Tags"
                                                    placeholder="Related Tags"
                                                />
                                                )}
                                            />
                                        </FormControl>
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
