import {React, useState, useRef, useEffect } from "react";
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import "./MainPage.css"
import "./fontawesome.css"
import Lottie from 'react-lottie';
import notFoundGif from '../../lottieAssets/notfoundANC';
import loaderGif from '../../lottieAssets/loaderANC';
import { toast } from "react-toastify";
import { useDispatch,useSelector } from 'react-redux';
import { setAnncData, setLoader, setSort, setPagination, setPaginCount, setPage } from "../../ReduxStore/features/MainPage/mainPageSlice"
import FilterLanguage from "./Filter";
import {FetchAnnc} from "../../hooks/useAnnounceFetchMainPage";
import {Make_Offer} from "../../hooks/useOfferAnnc"



// slider function :
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






// when data inaccessible
const NotFound = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundGif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return(
    <div class="col-lg-12">
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
  )
}
// loading for announcements
const Loader = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderGif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return(
    <div class="col-lg-12">
      <Lottie 
	    options={defaultOptions}
        height={350}
        width={350}
      />
    </div>
  )
}



///// show each announcements on mainpage
const Announce = (props) => {
  
  // For offer dialog :
  const [openOfferDialog, setOpenOfferDialog] = useState(false);
  const [openDiscDialog, setOpenDiscDialog] = useState(false);
  const fetchOffer = Make_Offer()
  

  const handleOpenDiscDialog = () => {
    setOpenDiscDialog(true);
  };

  const handleCloseDiscDialog = () => {
    setOpenDiscDialog(false);
  };

  const handleOpenOfferDialog = () => {
    setOpenOfferDialog(true);
  };

  const handleCloseOfferDialog = () => {
    setOpenOfferDialog(false);
  };

  const handleOffer = () => {
      handleCloseOfferDialog()
      toast.success("your offer submited successfully");
      props.dispatch(setLoader(true))
      fetchOffer(props.anc.id) 
  }

  
  let Description = "";
  if(props.anc.anc_description.includes("\n")){
    props.anc.anc_description = props.anc.anc_description.replace(/\n/g, " ");
  }
  else if(props.anc.anc_description.includes("\t")){
    props.anc.anc_description = props.anc.anc_description.replace(/\t/g, " ");
  }
  if(props.anc.anc_description.length > 44){
    Description = props.anc.anc_description.substring(0, 44) + "..."
  }else{
    Description = props.anc.anc_description
  }
   
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
                <span class="info">*{props.anc.travelers_count} Travelers</span>
                
                <h4>{props.anc.announcer_username}</h4>

                <div class="row">
                  <div class="col-6">
                    <i class="fa fa-clock"></i>
                    <span class="list">{props.anc.arrival_date}</span>
                  </div>
                  <div class="col-6">
                    <i class="fa fa-clock"></i>
                    <span class="list">{props.anc.arrival_date}</span>
                  </div>
                  
                </div>
                <div style={{justifyContent : "left", padding : "7px 0px " }}>
                    <i class="fa fa-city"></i>
                    <span class="list">{props.anc.city_country} - {props.anc.city_name}</span>
                </div>
                <p onClick = {() => {if(props.anc.anc_description.length != 0){handleOpenDiscDialog()}}}>{Description}</p>
                <div class="main-button" style={{cursor : "pointer"}} onClick={handleOpenOfferDialog}>
                  <div className='annc' style={{color : "#fff"}}> Give an offer </div>
                </div>
                <Dialog
                  open={openOfferDialog}
                  keepMounted
                  onClose={handleCloseOfferDialog}
                  aria-describedby="alert-dialog-slide-description"
                  PaperProps={{
                    sx: {
                      width: "100%",
                      maxWidth: "450px!important",
                      "border-radius" : "50px",
                      backgroundColor : "white"
                    },
                  }}
                  >
                  <DialogTitle>{"Are You Sure?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{justifyContent : "center"}}>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions style={{justifyContent : "center"}}>
                    <div class="main-button" style={{cursor : "pointer"}} onClick={handleOffer}>
                      <div className='annc' style={{color : "#fff"}}> Yes </div>
                    </div>
                    <div class="main-button" style={{cursor : "pointer"}} onClick={handleCloseOfferDialog}>
                      <div className='annc' style={{color : "#fff"}}> No </div>
                    </div>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openDiscDialog}
                  keepMounted
                  onClose={handleCloseDiscDialog}
                  aria-describedby="alert-dialog-slide-description"
                  PaperProps={{
                    sx: {
                      width: "100%",
                      maxWidth: "450px!important",
                      "border-radius" : "50px",
                      backgroundColor : "white"
                    },
                  }}
                  >
                  <DialogTitle>{`${props.anc.announcer_username}'s Discription`}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{justifyContent : "center"}}>
                      <div className = "dialogdesc">
                        <p>{props.anc.anc_description}</p>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions style={{justifyContent : "center"}}>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  )
}

export default function MainPage(){

    const fetchAnnc = FetchAnnc()
    const dispatch = useDispatch()
    const announcdata = useSelector((state) => state.mainpage.announcData)
    const loader = useSelector((state) => state.mainpage.loader)
    const sort = useSelector((state) => state.mainpage.sort)
    const filters = useSelector((state) => state.mainpage.filters)
    // for pagination :
    const showPagination = useSelector((state) => state.mainpage.showPagination)
    const paginCount = useSelector((state) => state.mainpage.paginCount)
    const page = useSelector((state) => state.mainpage.page)


    useEffect(() => {
      clickInputsInOrder(0);
    }, []);
      
    useEffect(() => {
      fetchAnnc()
    }, []);

  

    const anncData = [
      {image :  require("../../Assets/images/deals-01.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
      {image :  require("../../Assets/images/deals-02.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
      {image :  require("../../Assets/images/deals-03.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
      {image :  require("../../Assets/images/deals-04.jpg"), leftDays : 'X', userName : "user", startDate : "start", endDate : "end", desc : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. "},
    ]

    // show all anncs
    const showAnnc = () => {
      if(loader == true){
        return(
          Loader()
        )
      }
      else if(announcdata.length == 0 ){
        return(
          NotFound()
        )
      }
      else{
        return(
          announcdata.map(data => <Announce anc = {data} dispatch = {dispatch} sort = {sort}/>)
        )
      }

    }

    const handlePageChange = (event, value) => {
      dispatch(setLoader(true))
      dispatch(setPage(value));
      fetchAnnc(value, sort, filters)
    };

    //function for show pagination :
    const showpageination = () => {
      const theme = createTheme({
        palette: {
          secondary: {
            main: '#f7f7f7',
            '&:hover' : '#f7f7f7',
            },
          },
      });
      if(showPagination){
        return(
          <div className = "pagination-container" >
            <ThemeProvider theme = {theme}>
              <Pagination 
              count = {paginCount}
              page = {page}
              onChange={handlePageChange}
              color = "secondary"
              size = "large"
              variant = "outlined"
              /> 
            </ThemeProvider>   
          </div>
        )
      }
    }

    // const handleSortChange = (event) => {
    //   setLoader(true)
    //   setPage(1);
    //   setSort(event.target.value)
    //   fetchAnnc(setAnncData, setPagination, setPaginCount, setLoader, setAncResultCount, event.target.value, 1)
    // }
    
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
      
      {/* <div class="cities-town">
        <div class="container">
          <div class="row">
            <div class="slider-content-main-page">
              <div class="row">
                <div class="col-lg-12"> 
                {showGeneralost()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div class="amazing-deals">
        <div class="container">

          <div class="col-lg-6 offset-lg-3">
            <div class="section-heading text-center">
              <h2>Announcements In Your City</h2>
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p> */}
              {/* <h2>Results : {ancResultCount} </h2> */}
            </div>
          </div>

          <div class="search-form">
            <div class="container">
              <div class="row">
              
                {/* <FilterBar/> */}
                <div id="search-form">
                  <FilterLanguage></FilterLanguage>
                  <div class = "row">
                    {showAnnc()}
                    {showpageination()}
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          <div class="row">
            
            
         
          </div>
        </div>
      </div>


    </div>



  );

}