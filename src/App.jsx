import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import Login from "./pages/login";
import NewRequestPage from "./pages/NewRequest";
import DashboardPage from './pages/Dashboard';
import InboxPage from './pages/Inbox';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import Navbar from "./components/navbar/Navbar"
import React, { useEffect, useState } from "react";
import MainPageFunc from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
import SignInForm from "./pages/signup";
import PostExperience from "./pages/PostExperience";
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
  // console.log(props);
  // const { location }  = props;
  // const [selectedTab, setSelectedTab] = useState(
  //   tabNametoIndex[location.pathname.split("/")[2]]
  //   ? tabNametoIndex[location.pathname.split("/")[2]]
  //   : 1
  // );

  // const handleTabChange = (newValue) => {
  //   setSelectedTab(newValue)
  // };

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
        {location.pathname !== "/authentication" && <Navbar />}
        

        <body  style = {allPagesStyle}>

          <div style = {content}>

            <Routes>
              <Route exact path="/authentication/:tabIndex?" element={<Authentication />}/>
              <Route exact path="/signup" element={<SignInForm />}/>
              <Route path="/home/Dashboard/" element={<MainPageFunc />}/>
              <Route path="/:user_name" element={<ProfilePage />}/>
              <Route path="/home/Inbox/" element={<InboxPage />}/>
              <Route path="/home/Settings/" element={<SettingsPage />}/>
              <Route path="/home/AddNewRequest/" element={<NewRequestPage />}/>
            </Routes>

          </div>

          {location.pathname !== "/authentication" && <Footer/>}

        </body>
        <ToastContainer />
      </>
    
    // </Router>
  );

}

export default App;
