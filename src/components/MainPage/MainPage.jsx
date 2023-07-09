import {React, useState, useRef, useEffect } from "react";
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
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

import tehranImg from "../../Assets/images/tehran.jpg"
import parisImg from "../../Assets/images/paris.jpg"
import londonImg from "../../Assets/images/London.jpg"
import newyorkImg from "../../Assets/images/newyork.jpg"

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
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userId, setUserId] = useState(props.anc.announcer);


  const languageName = (languageId) => {
    if (props.languages === null){
      return null
    }
    for (const language of props.languages){
      if(languageId === language.id){
        return language.language_name;
      }
    }
  }


  const fetchPhoto = async () => {
    try {
  
    await axios.get(`https://api.nomadjourney.ir/api/v1/accounts/get-profile-photo/${userId}`).then(
        (response) => {
          console.log(response.data)
          console.log(response.status)
          if (response.status == 200){
            setProfilePhoto(response.data["profile_photo"])
          }
        }
    )
    
    } catch (error) {
    console.error(error);
    }
  }

  useEffect(() => {
    fetchPhoto()
  }, [userId]);



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
      props.dispatch(setLoader(true))
      fetchOffer(props.anc.id)
  }

  
  let Description = "";
  // if(props.anc.anc_description.includes("\n")){
  //   props.anc.anc_description = props.anc.anc_description.replace(/\n/g, " ");
  // }
  // else if(props.anc.anc_description.includes("\t")){
  //   props.anc.anc_description = props.anc.anc_description.replace(/\t/g, " ");
  // }
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
                <img style={{maxWidth : "260px"}} src= { profilePhoto ? `https://api.nomadjourney.ir${profilePhoto}` : require("../../Assets/images/deals-01.jpg")} alt=""/>
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
                    <span class="list">{props.anc.departure_date}</span>
                  </div> 
                  
                </div>
                <div style={{justifyContent : "left", padding : "7px 0px " }}>
                    <i class="fa fa-city"></i>
                    <span class="list">{props.anc.city_country} - {props.anc.city_name}</span>
                </div>
                <div style={{justifyContent : "left", padding : "7px 0px ", display : "flex"}}>
                    <i class="fa fa-language" style={{marginTop : "2px"}}></i>
                    { props.anc.announcer_langs.length === 0 ? <span  class="list">None</span> : <span style={{display : "flex", gap : "5px"}} class="list">{props.anc.announcer_langs.map(data => <div style={{fontSize : "15px"}}> {languageName(data)} </div> )}</span>}
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




const Slider = () => {

const [randomData, setRandomData] = useState(null);

  const fetchRandom = async () => {
    try {
  
    await axios.get(`https://api.nomadjourney.ir/api/v1/landing-page/random-shit`).then(
        (response) => {

          setRandomData(response.data)
        }
    )
    
    } catch (error) {
    console.error(error);
    }
  }

  useEffect(() => {
    fetchRandom()
  }, []);

  if (randomData === null){
    return(
      <div style={{marginLeft : "5%"}}>
        <Skeleton animation="wave" height={"700px"} width={"1400px"}/>
      </div>
    )
  }
  else{
  return(
    <div class="slider">
      <div id="top-banner-1" class="banner" style={{backgroundImage : `url(https://api.nomadjourney.ir${randomData[0].city_big_image64})`}}>
        <div class="banner-inner-wrapper header-text">
          <div class="main-caption">
            <h2>Take a Glimpse Into The Beautiful City Of:</h2>
            <h1>{randomData[0]['city_name']}</h1>
            {/* <div class="border-button"><a href="about.html">Go There</a></div> */}
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="more-info">
                  <div class="row">
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-user"></i>
                      <h4><span>Population:</span><br/>{randomData[0]['population']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-globe"></i>
                      <h4><span>Territory:</span><br/>{randomData[0]['area']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-money-bill"></i>
                      <h4><span>Currency:</span><br/>{randomData[0]['currency']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <div class="main-button">
                        <a href={randomData[0]['explore_more']}>Explore More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="top-banner-2" class="banner" style={{backgroundImage : `url(https://api.nomadjourney.ir${randomData[1].city_big_image64})`}}>
        <div class="banner-inner-wrapper header-text">
          <div class="main-caption">
            <h2>Take a Glimpse Into The Beautiful City Of:</h2>
            <h1>{randomData[1]['city_name']}</h1>
            {/* <div class="border-button"><a href="about.html">Go There</a></div> */}
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="more-info">
                  <div class="row">
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-user"></i>
                      <h4><span>Population:</span><br/>{randomData[1]['population']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-globe"></i>
                      <h4><span>Territory:</span><br/>{randomData[1]['area']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-money-bill"></i>
                      <h4><span>Currency:</span><br/>{randomData[1]['currency']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <div class="main-button">
                        <a href={randomData[1]['explore_more']}>Explore More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="top-banner-3" class="banner" style={{backgroundImage : `url(https://api.nomadjourney.ir${randomData[2].city_big_image64})`}}>
        <div class="banner-inner-wrapper header-text">
          <div class="main-caption">
            <h2>Take a Glimpse Into The Beautiful City Of:</h2>
            <h1>{randomData[2]['city_name']}</h1>
            {/* <div class="border-button"><a href="about.html">Go There</a></div> */}
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="more-info">
                  <div class="row">
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-user"></i>
                      <h4><span>Population:</span><br/>{randomData[2]['population']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-globe"></i>
                      <h4><span>Territory:</span><br/>{randomData[2]['area']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-money-bill"></i>
                      <h4><span>Currency:</span><br/>{randomData[2]['currency']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <div class="main-button">
                        <a href={randomData[2]['explore_more']}>Explore More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="top-banner-4" class="banner" style={{backgroundImage : `url(https://api.nomadjourney.ir${randomData[3].city_big_image64})`}}>
        <div class="banner-inner-wrapper header-text">
          <div class="main-caption">
            <h2>Take a Glimpse Into The Beautiful City Of:</h2>
            <h1>{randomData[3]['city_name']}</h1>
            {/* <div class="border-button"><a href="about.html">Go There</a></div> */}
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="more-info">
                  <div class="row">
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-user"></i>
                      <h4><span>Population:</span><br/>{randomData[3]['population']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-globe"></i>
                      <h4><span>Territory:</span><br/>{randomData[3]['area']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <i class="fa fa-money-bill"></i>
                      <h4><span>Currency:</span><br/>{randomData[3]['currency']}</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 col-6">
                      <div class="main-button">
                        <a href={randomData[3]['explore_more']}>Explore More</a>
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
  )
  }
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

    const [randomData, setRandomData] = useState(null);
    const [languages, setLanguages] = useState(null);

    

    useEffect(() => {
      clickInputsInOrder(0);
    }, []);


    const loadLanguages = async () => {

      axios({
          method: "get",
          url: "https://api.nomadjourney.ir/api/v1/accounts/GetLanguages",
          headers: {
              'Content-Type': 'application/json',
          }
      }).then((result) => {
          setLanguages(result.data.data);
          console.log(result.data.data)
      }).catch((error) => {
          toast.error("Something went wrong while fetching Languages.")
      })
    }
    
    useEffect(() => {
      loadLanguages()
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
          announcdata.map(data => <Announce languages = {languages} anc = {data} dispatch = {dispatch} sort = {sort}/>)
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

          <Slider setRandomData = {setRandomData}/>

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
              <h2>Announcements</h2>
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