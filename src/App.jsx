import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import InboxPage from './pages/Inbox';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import Navbar from "./components/navbar/Navbar";
import EditProfile from "./components/UserPanel/EditProfile/EditProfile";
import React, { useEffect, useState } from "react";
import MainPageFunc from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
import SignInForm from "./pages/signup";
import Login from "./pages/login";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Loader.css'

const tabNametoIndex = {
  Dashboard: 1,
  Profile: 2,
  Inbox: 3,
  Settings: 4
}

function App() {

  let location = useLocation();
  const navigate=useNavigate()
  const allPagesStyle = {
    display: "flex",
    "flex-direction": "column",
    "min-height": "100vh",
  }

  const content = {
    "flex": 1,
  }

  const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
  }, []);
  useEffect(()=>{
    if(!localStorage.getItem("user")){
      navigate("/signup");
    }
    },[]);

    
  return (
      
      <>
        <div>
            
              {loading ? (

          <div id="js-preloader" class="js-preloader">
              <div class="preloader-inner">
              <span class="dot"></span>
              <div class="dots">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              </div>
          </div>


          ) :<div>
        {!["/signup","/signup/", "/login/","/login"].includes(location.pathname) && <Navbar/>}

            <body  style = {allPagesStyle}>


              <div style = {content}>

                <Routes>
                  
                  <Route path="/signup" element={<SignInForm />}/>
                  <Route path="/login" element={< Login/>}/>
                  <Route path="/home/Dashboard/" element={<MainPageFunc />}/>
                  <Route path="/home/Profile/:username?" element={<ProfilePage />}/>
                  <Route path="/home/Inbox/" element={<InboxPage />}/>
                  <Route exact path="/home/Settings/" element={<SettingsPage />}/>
                  <Route path="home/Members/Edit/" element={<EditProfile />}/>
                </Routes>

              </div>
          {!["/signup","/signup/", "/login/","/login"].includes(location.pathname) && <Footer/>}

            </body>
            <ToastContainer 
                position="top-left"
                newestOnTop={true}
                pauseOnFocusLoss
                draggable
                autoClose={10000}
                closeOnClick
                pauseOnHover/>
        </div>}</div>

      </>            
        );
      
  

}

export default App;
