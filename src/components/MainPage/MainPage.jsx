// import * as React from 'react';
import Box from '@mui/material/Box';
import "./MainPage.css"
import React, { useState, useEffect } from "react";
import App from './ImageSlide';
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

        // 
            
        //     <div className='groupbox1'>

        //         <div className='leftboxes1'>

        //             <Box
        //                 sx={{
        //                     width: 300,
        //                     height: 160,
        //                     backgroundColor: '#9B9B9B',
        //                     '&:hover': {
        //                     backgroundColor: "grey",
        //                     opacity: [0.9, 0.8, 0.7],
        //                     },
        //                     borderRadius : '10px',
        //                 }}
        //                 >
        //                     <div>
        //                         <header className='profheader'>
        //                             <h1> <b> Name Family</b></h1>
        //                             <h2>Country</h2>
        //                         </header>
        //                     </div>
        //             </Box>

        //                 <br/>

        //             <Box
        //                 sx={{
        //                     width: 300,
        //                     height: 160,
        //                     backgroundColor: '#9B9B9B',
        //                     '&:hover': {
        //                     backgroundColor: "grey",
        //                     opacity: [0.9, 0.8, 0.7],
        //                     },
        //                     borderRadius : '10px',
        //                 }}
        //                 >
        //                     <div>
        //                         <header className='progheader'>
        //                             <h1> <b> My Profile</b></h1>
        //                         </header>
        //                         <div className='prog'>    
        //                         <ProgressBar bgcolor="#D97D54" progress='60'  height={20} />
        //                         </div>
        //                     </div>  
        //                     <div className='complete'>
        //                         <h3>Completed</h3>
        //                     </div>          
        //             </Box>

        //             <br />

        //             <Box
        //                 sx={{
        //                     width: 300,
        //                     height: 660,
        //                     backgroundColor: '#9B9B9B',
        //                     '&:hover': {
        //                     backgroundColor: "grey",
        //                     opacity: [0.9, 0.8, 0.7],
        //                     },
        //                     borderRadius : '10px',
        //                 }}
        //                 >
        //                     <div>
        //                         <header className='progheader'>
        //                             <h1> <b> Box4</b></h1>
        //                         </header>
        //                     </div>       
        //             </Box>
                    
        //         </div>


        //         <div className='rightboxes1'>
        //             <Box
        //                 sx={{
        //                     width: 1000,
        //                     height: 500,
        //                     backgroundColor: '#9B9B9B',
        //                     borderRadius : '10px',
        //                 }}
        //                 >    
        //                 <div>
        //                     <h1>Random</h1>
        //                     <div style={containerStyles}>
        //                         <Slider slides={slides}/>
        //                     </div>
                            
        //                 </div>   
        //             </Box>
        //             <br />
        //             <Box
        //                 sx={{
        //                     width: 1000,
        //                     height: 500,
        //                     backgroundColor: '#9B9B9B',
        //                     borderRadius : '10px',
        //                 }}
        //                 >    
        //                 <div>
        //                     <h1>Announcements</h1>
                            
        //                 </div>   
        //             </Box>

        //         </div> 

        //     </div>
            
            

        // </div>
        // <div className='mainpagecontainer'>

        //     <div className='mainpageslider'>
        //         <App/>
        //     </div>
        // </div>


    <div className='mainpage'>

      
       
      
      <section id="section-1">
        <div class="content-slider">
          <input type="radio" id="banner1" class="sec-1-input" name="banner" checked/>
          <input type="radio" id="banner2" class="sec-1-input" name="banner"/>
          <input type="radio" id="banner3" class="sec-1-input" name="banner"/>
          <input type="radio" id="banner4" class="sec-1-input" name="banner"/>
          <div class="slider">
            <div id="top-banner-1" class="banner">
              <div class="banner-inner-wrapper header-text">/
                <div class="main-caption">
                  <h2>Take a Glimpse Into The Beautiful Country Of:</h2>
                  <h1>Caribbean</h1>
                  <div class="border-button"><a href="about.html">Go There</a></div>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="more-info">
                        <div class="row">
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-user"></i>
                            <h4><span>Population:</span><br/>44.48 M</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-globe"></i>
                            <h4><span>Territory:</span><br/>275.400 KM<em>2</em></h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-home"></i>
                            <h4><span>AVG Price:</span><br/>$946.000</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <div class="main-button">
                              <a href="about.html">Explore More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="top-banner-2" class="banner">
              <div class="banner-inner-wrapper header-text">
                <div class="main-caption">
                  <h2>Take a Glimpse Into The Beautiful Country Of:</h2>
                  <h1>Switzerland</h1>
                  <div class="border-button"><a href="about.html">Go There</a></div>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">/
                      <div class="more-info">
                        <div class="row">
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-user"></i>
                            <h4><span>Population:</span><br/>8.66 M</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-globe"></i>
                            <h4><span>Territory:</span><br/>41.290 KM<em>2</em></h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-home"></i>
                            <h4><span>AVG Price:</span><br/>$1.100.200</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <div class="main-button">
                              <a href="about.html">Explore More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="top-banner-3" class="banner">
              <div class="banner-inner-wrapper header-text">
                <div class="main-caption">
                  <h2>Take a Glimpse Into The Beautiful Country Of:</h2>
                  <h1>France</h1>
                  <div class="border-button"><a href="about.html">Go There</a></div>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="more-info">
                        <div class="row">
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-user"></i>
                            <h4><span>Population:</span><br/>67.41 M</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-globe"></i>
                            <h4><span>Territory:</span><br/>551.500 KM<em>2</em></h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-home"></i>
                            <h4><span>AVG Price:</span><br/>$425.600</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <div class="main-button">
                              <a href="about.html">Explore More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="top-banner-4" class="banner">
              <div class="banner-inner-wrapper header-text">
                <div class="main-caption">
                  <h2>Take a Glimpse Into The Beautiful Country Of:</h2>
                  <h1>Thailand</h1>
                  <div class="border-button"><a href="about.html">Go There</a></div>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="more-info">
                        <div class="row">
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-user"></i>
                            <h4><span>Population:</span><br/>69.86 M</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-globe"></i>
                            <h4><span>Territory:</span><br/>513.120 KM<em>2</em></h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <i class="fa fa-home"></i>
                            <h4><span>AVG Price:</span><br/>$165.450</h4>
                          </div>
                          <div class="col-lg-3 col-sm-6 col-6">
                            <div class="main-button">
                              <a href="about.html">Explore More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav>
            <div class="controls">
              <label for="banner1"><span class="progressbar"><span class="progressbar-fill"></span></span><span class="text">1</span></label>
              <label for="banner2"><span class="progressbar"><span class="progressbar-fill"></span></span><span class="text">2</span></label>
              <label for="banner3"><span class="progressbar"><span class="progressbar-fill"></span></span><span class="text">3</span></label>
              <label for="banner4"><span class="progressbar"><span class="progressbar-fill"></span></span><span class="text">4</span></label>
            </div>
          </nav>
        </div>
    </section>
  </div>

  );

}