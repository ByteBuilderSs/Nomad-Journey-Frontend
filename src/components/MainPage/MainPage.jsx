import * as React from 'react';
import Box from '@mui/material/Box';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./MainPage.css"

function WithLabelExample() {
    const now = 60;
    return (<ProgressBar now={now} label={`${now}%`} />);
}

export default function MainPage(){


    return(

        <div className='mainpage'>
            
            <div className='boxes'>

                <div className='profile'>

                    <Box
                        sx={{
                            width: 300,
                            height: 160,
                            backgroundColor: '#9B9B9B',
                            '&:hover': {
                            backgroundColor: "grey",
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        >
                            <div>
                                <header className='profheader'>
                                    <h1> <b> Name Family</b></h1>
                                    <h2>Country</h2>
                                </header>
                            </div>
                    </Box>

                        <br/>

                    <Box
                        sx={{
                            width: 300,
                            height: 160,
                            backgroundColor: '#9B9B9B',
                            '&:hover': {
                            backgroundColor: "grey",
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        >
                            <div>
                                <header className='progheader'>
                                    <h1> <b> My Profile</b></h1>
                                </header>
                                <div className='prog'>
                                    <WithLabelExample />
                                </div>
                            </div>  
                            <div className='complete'>
                                <h3>Completed</h3>
                            </div>          
                    </Box>

                    <br />

                    <Box
                        sx={{
                            width: 300,
                            height: 700,
                            backgroundColor: '#9B9B9B',
                            '&:hover': {
                            backgroundColor: "grey",
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        >
                            <div>
                                <header className='progheader'>
                                    <h1> <b> My Profile</b></h1>
                                </header>
                                <div className='prog'>
                                    <WithLabelExample />
                                </div>
                            </div>  
                            <div className='complete'>
                                <h3>Completed</h3>
                            </div>          
                    </Box>
                    
                </div>


                <div className='random'>
                    <Box
                        sx={{
                            width: 1000,
                            height: 500,
                            backgroundColor: '#9B9B9B',
                            '&:hover': {
                            backgroundColor: "grey",
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        >    
                        <div>
                            <h1>Random</h1>
                        </div>   
                    </Box>
                </div>


            </div>
            
            

        </div>


    );

}