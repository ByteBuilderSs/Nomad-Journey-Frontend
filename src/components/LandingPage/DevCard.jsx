import {React, useState, useRef, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import "./DevCard.css"

export default function DevCard(probs){

    return(
        <div className="Dev-card">
            <div class="container">
                <div >
                    <div class="our-team">
                        <div class="picture">
                        <img class="img-fluid" src={probs.img}/>
                        </div>
                        <div class="team-content">
                        <h3 class="name">{probs.name}</h3>
                        <h4 class="title">{probs.title}</h4>
                        </div>
                        <ul class="social">
                        <li><a href="https://codepen.io/collection/XdWJOQ/" aria-hidden="true"> <FaInstagram/></a></li>
                        <li><a href="https://codepen.io/collection/XdWJOQ/" aria-hidden="true"><FaLinkedin/></a></li>
                        <li><a href="https://codepen.io/collection/XdWJOQ/"  aria-hidden="true"><FaTwitter/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )


}