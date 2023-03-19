import { color } from '@mui/system';
import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <footer style={{ backgroundColor: '#D97D54', color : '#fff', height: '100px', width: '100%'}}>

            <div className="texts">
              <h4 >Nomad Journey</h4>
              About
            </div>

            <div className="links">
              <div className="social-links">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff"}}><FaInstagram size={24} /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff"}}><FaLinkedin size={24} /></a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff"}}><FaTwitter size={24} /></a>
              </div>
            </div>



        <div className="under-text">
          <p>&copy; 2023 Nomad Journey. All Rights Reserved.</p>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
