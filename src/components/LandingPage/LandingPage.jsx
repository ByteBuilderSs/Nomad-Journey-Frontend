import {React, useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import axios from 'axios';
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

import AnncSlider from "./AnncSlider";


import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import RoadAnimation from "./RoadAnimation";
import { Skeleton } from "@mui/material";



const Annc = (props) => {
    const navigate = useNavigate()
    return(
            
            <div class="item">
                <div class="thumb">
                    <img className="imgphoto" style={{maxHeight : "400px", maxWidth : "300px"}} src={false ? `https://api.nomadjourney.ir${props.data.profile_photo}` : require("../../Assets/images/offers-01.jpg")} alt=""/>
                    <div class="text">
                    <div >
                        <div className="headers">
                            <h4 style={{marginRight : "10px"}}>{props.data.announcer_username[0]}<br/></h4>
                            <h6>{props.data.avg_feedback}<br/></h6>
                        </div>
                        <div><h4><span><i class="fa fa-users"></i> {props.data.travelers_count} Travelers Count</span></h4></div>
                        
                    </div>
                    
                    <div class="line-dec"></div>
                    <ul>
                        <li>Includes:</li>
                        <li><i class="fa fa-clock" style={{marginRight : "10px"}}></i>{props.data.arrival_date}</li>
                        <li><i class="fa fa-clock" style={{marginRight : "10px"}}></i>{props.data.departure_date}</li>
                        <li><i class="fa fa-building" style={{marginRight : "10px"}}></i> {props.data.anc_city}</li>
                    </ul>
                    <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                        <div className='landing2' style={{color : "#fff"}}> Give An Offer </div>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default function LandingPage(){



    const navigate = useNavigate()

    const [topUsers, setTopUsers] = useState(null);

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



    const fetchTopUsers = async () => {

        try {
      
        await axios.get(`https://api.nomadjourney.ir/api/v1/landing-page/most-rated-hosts`).then(
            (response) => {
                setTopUsers(response.data)
                console.log(response.data)
            }
        )
        
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchTopUsers()
    }, []);



    return(
        <div className="landing-page" >
            {/* <Header/> */}
            <div className="about-main-content">
                <div ><RoadAnimation/></div>
                <div class="container" >
                    <div class="row">
                        <div class="col-lg-12">
                        <div class="content">
                            <div class="blur-bg"></div>
                            <h4 style={{color : "black"}}>EXPLORE OUR PROJECT</h4>
                            <div class="line-dec"></div>
                            <h2 style={{color : "black"}}>Welcome To Nomad Journey</h2>
                            <div style={{display : "flex", gap :"5px"}}>
                                <div class="main-button" style={{cursor : "pointer", marginLeft : "42%"}} onClick={() => {navigate("/login")}}>
                                    <div className='landing1' style={{color : "#fff"}}> Login </div>
                                </div>
                                <div class="main-button" style={{cursor : "pointer"}} onClick={() => {navigate("/signup")}}>
                                    <div className='landing1' style={{color : "#fff"}}> Signup </div>
                                </div>
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
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar]}
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation = {{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}                        

                    >

                    {topUsers === null ? <Skeleton width={"500px"} height={"500px"} style={{borderRadius : "20px", color : "black", zIndex : 1}}/> : topUsers.map(data => <SwiperSlide>  <Annc data = {data}/> </SwiperSlide>)}
                        
                        
                        <div className = "swiper-button-next" style={{paddingLeft : "50px", color : "rgba(0,78,137,1)"}}></div>
                        <div className = "swiper-button-prev" style={{paddingRight : "50px", color : "rgba(0,78,137,1)"}}></div>
                        <div className="swiper-pagination" style={{paddingBottom : "10px"}}></div>
                    </Swiper>
                    

                        
                        
                        
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
                            <h2> Developers</h2>
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

                {/* <div className="dev-team" style={{marginTop : "200px"}}>
                    <div class="container">
                        <div class="row">
                            <div class="slider-content">
                            <AnncSlider></AnncSlider>
                            </div>
                        </div>
                    </div>
                </div> */}

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