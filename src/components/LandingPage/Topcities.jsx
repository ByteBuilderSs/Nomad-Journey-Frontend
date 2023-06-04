import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./TopCities.scss"
import Skeleton from '@mui/material/Skeleton';

import londonImg from "../../Assets/images/london.avif"
import tehranImg from "../../Assets/images/tehran.jpg"
import parisImg from "../../Assets/images/Paris.avif"
import romeImg from "../../Assets/images/Rome.avif"
import newYorkImg from "../../Assets/images/NewYork.avif"
import sydneyImg from "../../Assets/images/Sydney.avif"

const TopCities = () => {

  const [cityData, setCityData] = useState(null);


  const fetchCities = async () => {
    try {
  
    await axios.get(`https://api.nomadjourney.ir/ api/v1/landing-page/most-visited-cities`).then(
        (response) => {
          console.log(response.data)
          setCityData(response.data)
        }
    )
    
    } catch (error) {
    console.error(error);
    }
  }

  useEffect(() => {
    fetchCities()
  }, []);

  if (cityData === null){
    return(
      <div className="ehem">
        <Skeleton height={"500px"} style={{borderRadius : "20px"}}/>
      </div>
    )
  }
  else{
  return(
    <div className='ehem'>
      <section>

        <div class="card">

        <div class="card__img">
        {/* <Skeleton animation="wave" width={250} height={200}/> */}
          <img src = {`http://188.121.102.52:8000${cityData[4]["city_big_image64"]}`} alt="Big Ben"/>
            <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>{cityData[4]["rank"]}</span>
          <div class="card__overlay">
            <h2>{cityData[4]["city_name"]}</h2>
            
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img">  
          {/* <Skeleton animation="wave" width={300} height={600}/> */}
          <img src={parisImg} alt="Eiffel Tower"/>
                <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>5</span>
          <div class="card__overlay">
            <h2>Paris</h2>
            
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img">  
          {/* <Skeleton animation="wave" width={430} height={300}/> */}
          <img src={`http://188.121.102.52:8000${cityData[2]["city_small_image64"]}`}alt="Colosseum"/>
              <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>{cityData[2]["rank"]}</span>
          <div class="card__overlay">
            <h2>{cityData[2]["city_name"]}</h2>
            
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img"> 
          {/* <Skeleton animation="wave" width={250} height={200}/> */} 
          <img src={`http://188.121.102.52:8000${cityData[1]["city_small_image64"]}`} alt="Azadi Tower"/>
                <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>{cityData[1]["rank"]}</span>
          <div class="card__overlay">
            <h2>{cityData[1]["city_name"]}</h2>
            
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img"> 
          {/* <Skeleton animation="wave" width={130} height={300}/>  */}
          <img src={`http://188.121.102.52:8000${cityData[3]["city_small_image64"]}`} alt=""/>
              <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>{cityData[3]["rank"]}</span>
          <div class="card__overlay">
            <h2>{cityData[3]["city_name"]}</h2>
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img">
          {/* <Skeleton animation="wave" width={250} height={200}/> */}
          <img src={`http://188.121.102.52:8000${cityData[5]["city_small_image64"]}`}alt="Sydney Opera House"/>
              <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>5 </span>
          <div class="card__overlay">
            <h2>Sydney</h2>
            
          </div>
          </div>
        </div>

      </section>
    </div>
  )
  }
}

export default TopCities;
