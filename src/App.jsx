import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import InboxPage from './pages/Inbox';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import Navbar from "./components/navbar/Navbar";
import EditProfile from "./components/UserPanel/EditProfile/EditProfile";
import React, { useEffect, useState } from "react";
import MainPageFunc from "./pages/MainPage";
import LandingPageFunc from "./pages/LandingPage";
import Footer from "./components/Footer/Footer";
import SignInForm from "./pages/signup";
import Login from "./pages/login";
import PostDetailPage from "./pages/PostDetail";
import PostEditPage from "./pages/PostEdit";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Loader.css';
import PostExperience from "./pages/PostExperience";
import CounterProvider from "./Context/CounterProvider";
import GeneralPostPage from "./pages/GeneralPosts";
import MessengerBox from './pages/MessengerBox'
import ForgotPassword from './pages/ForgotPass'
import ResetPassWord from "./pages/ResetPass";
const tabNametoIndex = {
  Dashboard: 1,
  Profile: 2,
  Inbox: 3,
  Settings: 4
}

function App() {

  let location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const allPagesStyle = {
    display: "flex",
    "flex-direction": "column",
    "min-height": "100vh",
    "background-color": "#EDE7E6"
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
    if(!localStorage.getItem('tokens')){
      console.log('no user exists');
      setIsLogin(false);
      // navigate("/landing");
    }
    else {
      setIsLogin(true);
    }
    },[]);
  
  return (
      
      <>
        <CounterProvider>
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
          {!["/landing","/signup","/signup/", "/login/","/login","/resetpass","/forgotpass"].includes(location.pathname) && (isLogin !== false) && <Navbar/>}

              <body  style = {allPagesStyle}>


                <div style = {content}>

                    <Routes>
                      {isLogin === false ?
                        <>
                          <Route path="/landing" element={<LandingPageFunc/>}/>
                          <Route path="/signup" element={<SignInForm />}/>
                          <Route path="/login" element={< Login/>}/>
                          <Route path="/forgotpass" element={<ForgotPassword/>}/>
                          <Route path="/resetpass" element={<ResetPassWord/>}/>

                          {/* <Route path="/home/Dashboard/" element={<MainPageFunc />}/> */}
                        </>
                        :
                        <>
                          <Route path="/resetpass" element={<ResetPassWord/>}/>
                          <Route path="/landing" element={<LandingPageFunc/>}/>
                          <Route path="/posts" element={<GeneralPostPage/>}/>
                          <Route path="/signup" element={<SignInForm />}/>
                          <Route path="/login" element={< Login/>}/>
                          <Route path="/home/Dashboard/" element={<MainPageFunc />}/>
                          <Route path="/home/Profile/:username/" element={<ProfilePage />} />
                          <Route path="/home/Inbox/" element={<InboxPage />}/>
                          <Route exact path="/home/Settings/Members/:username/" element={<SettingsPage />}/>
                          <Route exact path="/home/Members/Edit/" element={<EditProfile />}/>
                          <Route exact path="/home/PostExperience/announcement/:announcement_id" element={<PostExperience />}/>
                          <Route exact path="/home/PostExperience/PostDetail/:slug" element={<PostDetailPage />}/>
                          <Route exact path="/home/PostExperience/Edit/:uid/:slug" element={<PostEditPage />}/>
                        <Route path="/chatbar/" element={<MessengerBox/>}/>
                        </>
                        }
                    </Routes>
                  

                </div>
            {!["/landing","/signup","/signup/", "/login/","/login","/forgotpass","/resetpass"].includes(location.pathname) && <Footer/>}

              </body>
              <ToastContainer 
                  position="top-left"
                  newestOnTop={true}
                  pauseOnFocusLoss
                  draggable
                  autoClose={7000}
                  closeOnClick
                  pauseOnHover/>
          </div>}
          </div>
        </CounterProvider>
      </>            
        );
      
  

}

export default App;
