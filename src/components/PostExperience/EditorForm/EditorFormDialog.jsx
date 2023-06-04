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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
    palette: {
        primary: 
        {
            main: "#219EBC",
        },
        secondary: 
        {
            main: teal[900]
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const EditorFormDialog = (props) => {
    const [scroll, setScroll] = React.useState('paper');


    const handleClose = () => {
        props.setOpen(false);
        props.setClose(true);
    };

    return (
        <div>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={props.open}
            onHide={handleClose}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Modal title
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla.
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Save changes
            </Button>
            </DialogActions>
        </BootstrapDialog>
        </div>
    );
}

export default EditorFormDialog
