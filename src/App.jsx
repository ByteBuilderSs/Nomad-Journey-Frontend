import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import NewRequestPage from "./pages/NewRequest";
import DashboardPage from './pages/Dashboard';
import InboxPage from './pages/Inbox';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import Navbar from "./components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import MainPageFunc from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
import SignInForm from "./pages/signup";

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
  return (
      <Router>
          
        {/* <Navbar 
          // handleTabChange={handleTabChange}
          // selectedTab={selectedTab}
          // setSelectedTab={setSelectedTab}
          /> 
        <Footer /> */}
        
        
          <Routes>
            <Route path="/home/" element={<MainPageFunc />}/>
            <Route path="/home/Dashboard/" element={<DashboardPage />}/>
            <Route path="/home/Profile/" element={<ProfilePage />}/>
            <Route path="/home/Inbox/" element={<InboxPage />}/>
            <Route path="/home/Settings/" element={<SettingsPage />}/>
            <Route path="/home/AddNewRequest/" element={<NewRequestPage />}/>
            <Route path="/signUp/" element={<SignInForm />}/>
            <Route path="/login/" element={<Login />}/>
          </Routes>
      </Router>
  );

}

export default App;
