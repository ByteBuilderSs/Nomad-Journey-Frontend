import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import NewRequestPage from "./pages/NewRequest";
import SignInForm from "./pages/signup";

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/add-new-request">Add New Request</Link>
              </li>
              <li>
                <Link to="/signup">sign up</Link>
              </li><li>
                <Link to="/login">log in</Link>
              </li>
            </ul>
          </nav>
          
          <Routes>
            <Route exact path="/add-new-request" element={<NewRequestPage />}/>
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<SignInForm />}/>
          </Routes>
          <Routes>
            <Route exact path="/login" element={<Login />}/>
          </Routes>
        </div>
      </Router>
  );

}

export default App;
