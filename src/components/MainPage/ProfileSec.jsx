import * as React from 'react';
import Box from '@mui/material/Box';
import "./ProfileSec.css"

export default function ProfileBox() {
  return (
    <div className='prof'>
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
                <header className='boxheader'>
                    <h1> <b> Name Family</b></h1>
                    <h2>Country</h2>
                </header>
            </div>
        </Box>
    </div>
  );
}

