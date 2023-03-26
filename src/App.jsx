import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import NewRequestPage from "./pages/NewRequest";
import InboxPage from './pages/Inbox';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import Navbar from "./components/navbar/Navbar"
import React, { useEffect, useState } from "react";
import MainPageFunc from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
import SignInForm from "./pages/signup";
import Authentication from "./components/Auth/Auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const tabNametoIndex = {
  Dashboard: 1,
  Profile: 2,
  Inbox: 3,
  Settings: 4
}

function App() {

  let location = useLocation();

  const allPagesStyle = {
    display: "flex",
    "flex-direction": "column",
    "min-height": "100vh",
  }

  const content = {
    "flex": 1,
    // "padding-bottom": "110px"
  }

  
  return (
    // <Router>
      <>
        {(!localStorage.getItem("username")) && <Navigate to="/authentication" />}

        {(!location.pathname.includes("/authentication"))  && <Navbar />}
        

        <body  style = {allPagesStyle}>

          <div style = {content}>

            <Routes>
              <Route exact path="/authentication/:tabIndex?" element={<Authentication />}/>
              <Route path="/home/Dashboard/" element={<MainPageFunc />}/>
              <Route path="/home/Profile/:user_name" element={<ProfilePage />}/>
              <Route path="/home/Inbox/" element={<InboxPage />}/>
              <Route path="/home/Settings/" element={<SettingsPage />}/>
              {/* <Route path="/home/AddNewRequest/" element={<NewRequestPage />}/> */}
            </Routes>

          </div>

          {(!location.pathname.includes("/authentication")) && <Footer/>}

        </body>
        <ToastContainer 
            position="top-left"
            newestOnTop={true}
            pauseOnFocusLoss
            draggable
            autoClose={10000}
            closeOnClick
            pauseOnHover
          />
      </>
    
    // </Router>
  );

}

export default App;
