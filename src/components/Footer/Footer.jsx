import { color } from '@mui/system';
import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import "./Footer.css"

const Footer = () => {
  return (
      // <footer className='footer' style={{ backgroundColor: 'rgba(0,78,137,1)', color : '#fff', height: '100px', width: '100%'}}>
      //     <div className='container'>
      //       <div className="row">
      //         <div className='col-lg-12'>
      //           <h4 style={{marginLeft : "595px"}}>Nomad Journey</h4>
      //           <p style={{marginLeft : "510px"}} >&copy; 2023 Nomad Journey. All Rights Reserved.</p>
      //           <div className="social-links">
      //             
      //           </div>
      //         </div>
      //       </div>
      //     </div>

      // </footer>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <p>Copyright © 2023 <a href="#">Nomad Journey</a> All rights reserved. 
            <br/><br/>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff", marginRight : "10px"}}><FaInstagram size={24} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff", marginRight : "10px"}}><FaLinkedin size={24} /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff"}}><FaTwitter size={24} /></a>
            </p>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
