import * as React from 'react';
import Box from '@mui/material/Box';
import "./ProgressSec.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import { padding, textAlign } from '@mui/system';

function WithLabelExample() {
  const now = 60;
  return (<ProgressBar now={now} label={`${now}%`} />);
}



  


export default function ProgressBox() {
  return (
    <div className='progbox'>
        <Box
        sx={{
            width: 300,
            height: 150,
            backgroundColor: '#9B9B9B',
            '&:hover': {
            backgroundColor: "grey",
            opacity: [0.9, 0.8, 0.7],
            },
        }}
        >
            <div>
                <header className='boxheader2'>
                    <h1> <b> My Profile</b></h1>
                </header>
                <section className='prog'>
                    <WithLabelExample />
                </section>
            </div>  
            <div className='complete'>
                <h3>Completed</h3>
            </div>          
        </Box>
    </div>
  );
}

