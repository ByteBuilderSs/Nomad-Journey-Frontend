import {React, useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Header from "./Header";
import walkGif from '../../lottieAssets/walk.json';
import Lottie from 'react-lottie';
import { useNavigate } from "react-router-dom";
import TopCities from "./Topcities";
import DevCard from "./DevCard";
import "./LandingPage.css"

import sinaImg from "../../Assets/images/sina.jpg"
import aysaImg from "../../Assets/images/aysa.jpg"
import baktashImg from "../../Assets/images/baktash.jpg"
import aylinImg from "../../Assets/images/aylin.jpg"
import hannaImg from "../../Assets/images/hanna.jpg"
import amirImg from "../../Assets/images/amir.jpg"





export default function LandingPage(){

    const navigate = useNavigate()

    const [isTransparent, setIsTransparent] = useState(true);

    const Walk = () => {

        const defaultOptions = {
          loop: true,
          autoplay: true,
          animationData: walkGif,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
          }
        };
      
        return(
          <div class="col-lg-12">
            <Lottie 
              options={defaultOptions}
              height={450}
              width={450}
            />
          </div>
        )
    }






    return(
        <div className="landing-page">
            <Header/>
            <div class="about-main-content">
                
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                        <div class="content">
                            <div class="blur-bg"></div>
                            <h4>EXPLORE OUR PROJECT</h4>
                            <div class="line-dec"></div>
                            <h2>Welcome To Nomad Journey</h2>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uttersi labore et dolore magna aliqua is ipsum suspendisse ultrices gravida</p> */}
                            <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                                <div className='landing1' style={{color : "#fff"}}> Discover More </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cities-town">
                <div class="container">
                <div class="row">
                    <div class="slider-content">
                    <div class="row">
                        <div class="col-lg-12">
                        <h2> <em>Popular Cities</em></h2>
                        </div>
                        <div class="col-lg-12">
                        
                        <TopCities/>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            


            <div class="weekly-offers">
                <div class="container">
                <div class="row" >
                    <div class="col-lg-6 offset-lg-3" >
                    <div class="section-heading text-center" style={{marginTop : "50px"}}>
                        <h2>Weekly Announcements</h2>
                        <div style={{fontSize : "20px"}}>The best opportunity to learn about different cultures</div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                    <div class="landing-slider2">
                        <div class="item">
                        <div class="thumb">
                            <img src={require("../../Assets/images/offers-01.jpg")} alt=""/>
                            <div class="text">
                            <h4>Sina<br/><span><i class="fa fa-users"></i> 12 Travelers Count</span></h4>
                            <h6>Rate<br/></h6>
                            <div class="line-dec"></div>
                            <ul>
                                <li>Includes:</li>
                                <li><i class="fa fa-clock"></i> 10/05/2023 </li>
                                <li><i class="fa fa-clock"></i> 10/05/2023 </li>
                                <li><i class="fa fa-building"></i> City</li>
                            </ul>
                            <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                                <div className='landing2' style={{color : "#fff"}}> Give An Offer </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="item">
                        <div class="thumb">
                            <img src={require("../../Assets/images/offers-02.jpg")} alt=""/>
                            <div class="text">
                            <h4>Baktash<br/><span><i class="fa fa-users"></i> 12 Travelers Count</span></h4>
                            <h6>Rate<br/></h6>
                            <div class="line-dec"></div>
                            <ul>
                                <li>Includes:</li>
                                <li><i class="fa fa-clock"></i> 10/05/2023 </li>
                                <li><i class="fa fa-clock"></i> 10/05/2023 </li>
                                <li><i class="fa fa-building"></i> City</li>
                            </ul>
                            <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                                <div className='landing2' style={{color : "#fff"}}> Give An Offer </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="item">
                        <div class="thumb">
                            <img src={require("../../Assets/images/offers-01.jpg")} alt=""/>
                            <div class="text">
                            <h4>Sina<br/><span><i class="fa fa-users"></i> 12 Travelers Count</span></h4>
                            <h6>Rate<br/></h6>
                            <div class="line-dec"></div>
                            <ul>
                                <li>Includes:</li>
                                <li><i class="fa fa-clock"></i> 10/05/2023 </li>
                                <li><i class="fa fa-clock"></i> 10/05/2023 </li>
                                <li><i class="fa fa-building"></i> City</li>
                            </ul>
                            <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                                <div className='landing2' style={{color : "#fff"}}> Give An Offer </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="more-about">
                <div class="container">
                <div class="row">
                    <div class="col-lg-6 align-self-center">
                    <div class="left-image">
                        {/* <img src={require("assets/images/about-left-image.jpg")} alt=""/> */}
                        <Walk/>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="section-heading">
                        <h2>Discover More About Our Project</h2>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p> */}
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                        <div class="info-item">
                            <h4>150.640 +</h4>
                            <span>Total Guests Yearly</span>
                        </div>
                        </div>
                        <div class="col-lg-6">
                        <div class="info-item">
                            <h4>175.000+</h4>
                            <span>Amazing Accomoditations</span>
                        </div>
                        </div>
                        <div class="col-lg-12">
                        <div class="info-item">
                            <div class="row">
                            <div class="col-lg-6">
                                <h4>12.560+</h4>
                                <span>Amazing Places</span>
                            </div>
                            <div class="col-lg-6">
                                <h4>240.580+</h4>
                                <span>Different Check-ins Yearly</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p> */}
                    <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                        <div className='landing2' style={{color : "#fff"}}> Discover More </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            
            
                        
            <div className="dev-team">
                <div class="container">
                    <div class="row">
                        <div class="slider-content">
                        <div class="row">
                            <div class="col-lg-12">
                            <h2> <em>Developers</em></h2>
                            </div>
                            <div class="col-lg-12" style={{display : "flex",justifyContent : "center", gap : "5px"}}>
                                <DevCard name = {"Baktash Ansari"} title = {"Front-end developer"} img = {baktashImg}/>
                                <DevCard name = {"Hanna Hashemi"} title = {"Front-end developer"} img = {hannaImg}/>
                                <DevCard name = {"Aylin Naebzadeh"} title = {"Front-end developer"} img = {aylinImg}/>
                                <DevCard name = {"Amir Fakharzadeh"} title = {"Front-end developer"} img = {amirImg}/>
                            </div>
                            <div class="col-lg-12" style={{display : "flex",justifyContent : "center", gap : "5px"}}>
                                <DevCard name = {"Aysa MayahiNia"} title = {"Back-end developer"} img = {aysaImg}/>
                                <DevCard name = {"Sina Zamani"} title = {"Back-end developer"} img = {sinaImg}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="call-to-action">
                <div class="container">
                <div class="row">
                    <div class="col-lg-8" style={{justifyContent : "left"}}>
                    <h2>Are You Looking To Travel ?</h2>
                    <h4>Make An Announcement By Clicking The Button</h4>
                    </div>
                    <div class="col-lg-4">
                    <div class="border-button" onClick={() => {navigate("/signup")}}>
                        <div className='landing3' style={{color : "#fff"}}> SignUp Now </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            


        </div>
    )
}