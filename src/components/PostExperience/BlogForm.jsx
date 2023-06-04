import React from 'react';
import './BlogForm.css';
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
    CardContent,
    Typography,
    IconButton
} from '@mui/material';
import EditorForm from './EditorForm/EditorForm';
import { FcApproval, FcCheckmark, FcGlobe, FcNext } from "react-icons/fc";

const BlogForm = () => {
    return (
        <div className='blog-page'>
            <Container style={{ paddingTop: "3rem", paddingBottom: "2rem"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={8} lg={5} sx={{ ml: "3rem" }}>
                        <h1 style={{ marginLeft: "-3.5rem", display: "flex", alignItems: "center", fontSize: 35, color: "#023047" }} className="fields">
                            <FcNext size="2rem" style={{ marginRight: "0.5rem" }}/>
                                Post Your Journey Experience
                        </h1>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <EditorForm />
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={4} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14, display: "flex", alignItems: "center", fontWeight: "bold"  }} gutterBottom>
                                    <FcApproval size="2rem" style={{ marginRight: "0.5rem" }}/>
                                    This is policy card
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid> */}
                </Grid>
            </Container>
        </div>
    )
}

export default BlogForm
