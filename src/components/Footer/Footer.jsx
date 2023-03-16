import { color } from '@mui/system';
import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <footer style={{ backgroundColor: '#D97D54', color : '#fff', height: '100px',padding : "10px" ,  position: 'absolute', bottom: 0, width: '100%'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4>Nomad Journey</h4>
              <p>About</p>
            </div>
            <div className="col-md-6">
              <div className="social-links">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff"}}><FaInstagram size={24} /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff"}}><FaLinkedin size={24} /></a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{color:"#fff"}}><FaTwitter size={24} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2023 Project Name. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
