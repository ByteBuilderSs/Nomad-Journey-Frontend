import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewRequestPage from "./pages/NewRequest";
import DashboardPage from './pages/Dashboard';
import InboxPage from './pages/Inbox';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import Navbar from "./components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import SignInSide from "./pages/signup";
import MainPageFunc from "./pages/MainPage";

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
        <Navbar
          // handleTabChange={handleTabChange}
          // selectedTab={selectedTab}
          // setSelectedTab={setSelectedTab}
          /> 

          <Routes>
            <Route path="/home/Dashboard/" element={<DashboardPage />}/>
            <Route path="/home/Profile/" element={<ProfilePage />}/>
            <Route path="/home/Inbox/" element={<InboxPage />}/>
            <Route path="/home/Settings/" element={<SettingsPage />}/>
            <Route path="/home/AddNewRequest/" element={<NewRequestPage />}/>
            <Route path="/home/SignUp/" element={<SignInSide />}/>
          </Routes>
      </Router>
  );

}

export default App;
