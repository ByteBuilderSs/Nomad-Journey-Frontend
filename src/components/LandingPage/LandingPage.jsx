import {React, useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Header from "./Header";
import walkGif from '../../lottieAssets/walk.json';
import Lottie from 'react-lottie';
import { useNavigate } from "react-router-dom";

import "./LandingPage.css"



export default function LandingPage(){

    const navigate = useNavigate()

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
        <div>
            <Header/>

            <div class="about-main-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                        <div class="content">
                            <div class="blur-bg"></div>
                            <h4>EXPLORE OUR PROJECT</h4>
                            <div class="line-dec"></div>
                            <h2>Welcome To Nomad-Journey</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uttersi labore et dolore magna aliqua is ipsum suspendisse ultrices gravida</p>
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
                        
                        <div class="landing-slider1">
                            <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-01.jpg")} alt=""/>
                                <h4>Tehran</h4>
                            </div>
                            </div>
                            <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-02.jpg")} alt=""/>
                                <h4>Kish</h4>
                            </div>
                            </div>
                            <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-03.jpg")} alt=""/>
                                <h4>Shiraz</h4>
                            </div>
                            </div>
                            <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-04.jpg")} alt=""/>
                                <h4>Isfahan</h4>
                            </div>
                            </div>
                            {/* <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-01.jpg")} alt=""/>
                                <h4>Havana</h4>
                            </div>
                            </div>
                            <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-02.jpg")} alt=""/>
                                <h4>Kingston</h4>
                            </div>
                            </div>
                            <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-03.jpg")} alt=""/>
                                <h4>George Town</h4>
                            </div>
                            </div>
                            <div class="item">
                            <div class="thumb">
                                <img src={require("../../Assets/images/cities-04.jpg")} alt=""/>
                                <h4>Santo Domingo</h4>
                            </div>
                            </div> */}
                        </div>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
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
                        {/* <div class="item">
                        <div class="thumb">
                            <img src={require("../../Assets/images/offers-01.jpg")} alt=""/>
                            <div class="text">
                            <h4>Havana<br/><span><i class="fa fa-users"></i> 234 Check Ins</span></h4>
                            <h6>$420<br/><span>/person</span></h6>
                            <div class="line-dec"></div>
                            <ul>
                                <li>Deal Includes:</li>
                                <li><i class="fa fa-taxi"></i> 5 Days Trip {'>'} Hotel Included</li>
                                <li><i class="fa fa-plane"></i> Airplane Bill Included</li>
                                <li><i class="fa fa-building"></i> Daily Places Visit</li>
                            </ul>
                            <div class="main-button">
                                <a href="reservation.html">Make a Reservation</a>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="item">
                        <div class="thumb">
                            <img src={require("../../Assets/images/offers-02.jpg")} alt=""/>
                            <div class="text">
                            <h4>Kingston<br/><span><i class="fa fa-users"></i> 234 Check Ins</span></h4>
                            <h6>$420<br/><span>/person</span></h6>
                            <div class="line-dec"></div>
                            <ul>
                                <li>Deal Includes:</li>
                                <li><i class="fa fa-taxi"></i> 5 Days Trip {'>'} Hotel Included</li>
                                <li><i class="fa fa-plane"></i> Airplane Bill Included</li>
                                <li><i class="fa fa-building"></i> Daily Places Visit</li>
                            </ul>
                            <div class="main-button">
                                <a href="reservation.html">Make a Reservation</a>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="item">
                        <div class="thumb">
                            <img src={require("../../Assets/images/offers-03.jpg")} alt=""/>
                            <div class="text">
                            <h4>George Town<br/><span><i class="fa fa-users"></i> 234 Check Ins</span></h4>
                            <h6>$420<br/><span>/person</span></h6>
                            <div class="line-dec"></div>
                            <ul>
                                <li>Deal Includes:</li>
                                <li><i class="fa fa-taxi"></i> 5 Days Trip {">"} Hotel Included</li>
                                <li><i class="fa fa-plane"></i> Airplane Bill Included</li>
                                <li><i class="fa fa-building"></i> Daily Places Visit</li>
                            </ul>
                            <div class="main-button">
                                <a href="reservation.html">Make a Reservation</a>
                            </div>
                            </div>
                        </div>
                        </div> */}
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                    <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                        <div className='landing2' style={{color : "#fff"}}> Discover More </div>
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