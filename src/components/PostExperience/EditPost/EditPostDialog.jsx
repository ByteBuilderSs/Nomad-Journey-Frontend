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

const EditPostDialog = () => {
    return (
        <div>
        
        </div>
    )
}

export default EditPostDialog
