import * as React from 'react';
import Box from '@mui/material/Box';
import "./RandomSec.css"


  
export default function RandomBox() {
  return (
    <div className='random'>
        <Box
        sx={{
            width: 100,
            height: 400,
            backgroundColor: '#9B9B9B',
            '&:hover': {
            backgroundColor: "grey",
            opacity: [0.9, 0.8, 0.7],
            },
        }}
        >    
            test    
        </Box>
    </div>
  );
}


