import Box from '@mui/material/Box';
import "./MainPage.css"
import "./fontawesome.css"
import {React, useState, useRef, useEffect } from "react";
import App from './ImageSlide';
import { containerClasses } from '@mui/system';
import axios from 'axios';
import ConfirmAlert from './ReactConfirm';



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

function clickInputsInOrder(currentIndex = 0) {
  const inputIds = ['banner1', 'banner2', 'banner3', 'banner4'];

  
  const clickNextInput = () => {
    const currentInput = document.getElementById(inputIds[currentIndex]);
    if (currentInput) {
      currentInput.click();
      currentIndex = (currentIndex + 1) % inputIds.length;
      setTimeout(clickNextInput, 5000); // wait for 5 seconds
    }
  };

  clickNextInput();
}

const Announce = (props) => {
  // {image :  , leftDays : , userName : , startDate : , endDate : , desc : , }

  const {anc_city
  ,
  anc_description
  ,
  anc_status
  ,
  announcer
  ,
  announcer_image_code
  ,
  announcer_username
  ,
  arrival_date
  ,
  arrival_date_is_flexible
  ,
  city_country
  ,
  city_name
  ,
  departure_date
  ,
  departure_date_is_flexible
  ,
  id
  ,
  travelers_count} = props.anc
  
  console.log(props.anc)

  // const {image, leftDays, userName, startDate, endDate, desc} = props.anc
  // props.iterators.head += 1
  return(
    <div class="col-lg-6 col-sm-6">
      <div class="item">
        <div class="row">
          <div class="col-lg-6">
            <div class="image">
              <img src= {require("../../Assets/images/deals-01.jpg")} alt=""/>
            </div>
          </div>
          <div class="col-lg-6 align-self-center">
            <div class="content">
              <span class="info">*{travelers_count} Persons</span>
              <h4>{announcer_username}</h4>
              <div class="row">
                <div class="col-6">
                  <i class="fa fa-clock"></i>
                  <span class="list">{arrival_date}</span>
                </div>
                <div class="col-6">
                  <i class="fa fa-clock"></i>
                  <span class="list">{departure_date}</span>
                </div>
              </div>
              <p>{anc_description}</p>
              <div class="main-button" style={{cursor : "pointer"}} onClick={<ConfirmAlert/>}>
                <div className='annc' style={{color : "#fff"}}> Give an offer </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




export default function MainPage(){

    const [announcdata,setAnncData] = useState([])
    const iterators = { head: 0, limit : 4};

    useEffect(() => {
      clickInputsInOrder(0);
    }, []);

    
    
    


    useEffect(() => {


        try {
  
          const signedInUser = JSON.parse(localStorage.getItem("tokens"))
  
          const config = {
            headers: {
              Authorization: `Bearer ${signedInUser['access']}`
            }
          };
    
          axios.get('http://127.0.0.1:8000/api/v1/announcement/get-announcements-for-host/', config).then(
            (response) => {
              setAnncData(response.data)
            }
          )
          
          
        } catch (error) {
          console.error(error);
        }
        console.log("test")
        console.log(announcdata)

    }, []);

    


    const anncData = [
      {image :  require("../../Assets/images/deals-01.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
      {image :  require("../../Assets/images/deals-02.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
      {image :  require("../../Assets/images/deals-03.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
      {image :  require("../../Assets/images/deals-04.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
    ]

  return(

    <div className='mainpage'>

      
      <section id="section-1">
        <div class="content-slider">
          <input type="radio" id="banner1" class="sec-1-input" name="banner" />
          <input type="radio" id="banner2" class="sec-1-input" name="banner" />
          <input type="radio" id="banner3" class="sec-1-input" name="banner" />
          <input type="radio" id="banner4" class="sec-1-input" name="banner" />
          <div class="slider">
            <div id="top-banner-1" class="banner">
              <div class="banner-inner-wrapper header-text">
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
                    <div class="col-lg-12">
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

      <div class="search-form">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <form id="search-form" name="gs" method="submit" role="search" action="#">
                <div class="row">
                  <div class="col-lg-2">
                    <h4>Sort Announcements By:</h4>
                  </div>
                  <div class="col-lg-4">
                      <fieldset>
                          <select name="Location" class="form-select" aria-label="Default select example" id="chooseLocation" onChange="this.form.click()">
                              <option selected>Destinations</option>
                              <option type="checkbox" name="option1" value="Italy">Italy</option>
                              <option value="France">France</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Australia">Australia</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Singapore">Singapore</option>
                          </select>
                      </fieldset>
                  </div>
                  <div class="col-lg-4">
                      <fieldset>
                          <select name="Price" class="form-select" aria-label="Default select example" id="choosePrice" onChange="this.form.click()">
                              <option selected>Price Range</option>
                              <option value="100">$100 - $250</option>
                              <option value="250">$250 - $500</option>
                              <option value="500">$500 - $1,000</option>
                              <option value="1000">$1,000 - $2,500</option>
                              <option value="2500+">$2,500+</option>
                          </select>
                      </fieldset>
                  </div>
                  <div class="col-lg-2">                        
                      <fieldset>
                          <button class="border-button">Search Results</button>
                      </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="amazing-deals">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="section-heading text-center">
                <h2>Announcements In Your City</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
              </div>
            </div>

            {
              announcdata.map(data => <Announce anc = {data}/>) 
            }
              
            

            {/* <Announce anc={anncData[0]} iterators = {iterators}/>
            <Announce anc={anncData[1]}/>
            <Announce anc={anncData[2]}/>
            <Announce anc={anncData[3]}/>  */}

            
            <div class="col-lg-12">
              <ul class="page-numbers">
                <li><a href="#"><i class="fa fa-arrow-left"></i></a></li>
                <li><a href="#">1</a></li>
                <li class="active"><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#"><i class="fa fa-arrow-right"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>


    </div>



  );

}