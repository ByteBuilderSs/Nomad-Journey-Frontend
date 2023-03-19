// import * as React from 'react';
import Box from '@mui/material/Box';
import "./MainPage.css"
import React, { useState, useEffect } from "react";
import Slider from './ImageSlide';
import { containerClasses } from '@mui/system';


const ProgressBar = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: "20px",
        margin: 0
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:"20px",
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}


export default function MainPage(){


    const slides = [
        {url : "http://localhost:3000/kish.jpg", title : 'Kish Island'},
        {url :  "http://localhost:3000/Tehran.jpeg", title : 'Tehran City'},
        {url : "http://localhost:3000/Khaju_Bridje_at_night.jpg", title : 'Isfahan City'},
    ]

    const containerStyles = {
        width : '700px',
        height : '400px', 
        margin : '0 auto',
    }
    
    return(

        <div className='mainpage'>
            
            <div className='groupbox1'>

                <div className='leftboxes1'>

                    <Box
                        sx={{
                            width: 300,
                            height: 160,
                            backgroundColor: '#9B9B9B',
                            '&:hover': {
                            backgroundColor: "grey",
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius : '10px',
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
                            borderRadius : '10px',
                        }}
                        >
                            <div>
                                <header className='progheader'>
                                    <h1> <b> My Profile</b></h1>
                                </header>
                                <div className='prog'>    
                                <ProgressBar bgcolor="#D97D54" progress='60'  height={20} />
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
                            height: 660,
                            backgroundColor: '#9B9B9B',
                            '&:hover': {
                            backgroundColor: "grey",
                            opacity: [0.9, 0.8, 0.7],
                            },
                            borderRadius : '10px',
                        }}
                        >
                            <div>
                                <header className='progheader'>
                                    <h1> <b> Box4</b></h1>
                                </header>
                            </div>       
                    </Box>
                    
                </div>


                <div className='rightboxes1'>
                    <Box
                        sx={{
                            width: 1000,
                            height: 500,
                            backgroundColor: '#9B9B9B',
                            borderRadius : '10px',
                        }}
                        >    
                        <div>
                            <h1>Random</h1>
                            <div style={containerStyles}>
                                <Slider slides={slides}/>
                            </div>
                            
                        </div>   
                    </Box>
                    <br />
                    <Box
                        sx={{
                            width: 1000,
                            height: 500,
                            backgroundColor: '#9B9B9B',
                            borderRadius : '10px',
                        }}
                        >    
                        <div>
                            <h1>Announcements</h1>
                            
                        </div>   
                    </Box>

                </div> 

            </div>
            
            <div className='groupbox2'>
                <Box
                        sx={{
                            width: 1330,
                            height: 500,
                            backgroundColor: '#9B9B9B',
                            borderRadius : '10px',
                        }}
                        >    
                        <div>
                            <h1>Announcements</h1>
                            
                        </div>   
                </Box>
            </div>

        </div>


    );

}