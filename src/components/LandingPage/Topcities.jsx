import React, { useEffect } from 'react';
import "./TopCities.scss"
import Skeleton from '@mui/material/Skeleton';

import londonImg from "../../Assets/images/london.avif"
import tehranImg from "../../Assets/images/tehran.jpg"
import parisImg from "../../Assets/images/Paris.avif"
import romeImg from "../../Assets/images/Rome.avif"
import newYorkImg from "../../Assets/images/NewYork.avif"
import sydneyImg from "../../Assets/images/Sydney.avif"

const TopCities = () => {
  return(
    <div className='ehem'>
      <section>

        <div class="card">
        
        <div class="card__img">
        {/* <Skeleton animation="wave" width={250} height={200}/> */}
          <img src = {londonImg} alt="Big Ben"/>
            <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>4.5</span>
          <div class="card__overlay">
            <h2>London</h2>
            
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
          <img src={romeImg} alt="Colosseum"/>
              <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>4.7</span>
          <div class="card__overlay">
            <h2>Rome</h2>
            
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img"> 
          {/* <Skeleton animation="wave" width={250} height={200}/> */} 
          <img src={tehranImg} alt="Azadi Tower"/>
                <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>4.3</span>
          <div class="card__overlay">
            <h2>Tehran</h2>
            
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img"> 
          {/* <Skeleton animation="wave" width={130} height={300}/>  */}
          <img src={newYorkImg} alt=""/>
              <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>4.8</span>
          <div class="card__overlay">
            <h2>New York</h2>
          </div>
          </div>
        </div>
            <div class="card">
        <div class="card__img">
          {/* <Skeleton animation="wave" width={250} height={200}/> */}
          <img src={sydneyImg} alt="Sydney Opera House"/>
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

export default TopCities;
