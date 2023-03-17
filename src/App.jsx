import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import NewRequestPage from "./pages/NewRequest";
import DashboardPage from './pages/Dashboard';
import InboxPage from './pages/Inbox';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import Navbar from "./components/navbar/Navbar"
import React, { useEffect, useState } from "react";
import SignInSide from "./pages/signup";
import MainPageFunc from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
import SignInForm from "./pages/signup";
import PostExperience from "./pages/PostExperience";
const tabNametoIndex = {
  Dashboard: 1,
  Profile: 2,
  Inbox: 3,
  Settings: 4
}

function App(props) {
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
    /* set the min-height to 100% minus the height of the footer */
    "min-height" : "calc(100% - 100px)",/* replace 50px with the actual height of your footer */
    "padding-bottom": "110px", /* set the padding bottom to the height of the footer */
    "box-sizing": "border-box",
  }

  return (
      <Router>
        <Navbar />

        <div style = {allPagesStyle}>
                      
            <Routes>
              <Route exact path="/add-new-request" element={<NewRequestPage />}/>
            </Routes>
            <Routes>
              <Route exact path="/signup" element={<SignInForm />}/>
            </Routes>
            <Routes>
              <Route exact path="/add-new-request" element={<NewRequestPage />}/>
            </Routes>
            <Routes>
              <Route exact path="/signup" element={<SignInForm />}/>
            </Routes>
            <Routes>
              <Route path="/home/" element={<MainPageFunc />}/>
              <Route path="/home/Dashboard/" element={<DashboardPage />}/>
              <Route path="/home/Profile/" element={<ProfilePage />}/>
              <Route path="/home/Inbox/" element={<InboxPage />}/>
              <Route path="/home/Settings/" element={<SettingsPage />}/>
              <Route path="/home/PostExperience/" element={<PostExperience />}/>
            <Route path="/home/AddNewRequest/" element={<NewRequestPage />}/>
              <Route path="/home/SignUp/" element={<SignInSide />}/>
            </Routes>

        </div>

        <Footer/>

      </Router>
      
  );

}

export default App;
