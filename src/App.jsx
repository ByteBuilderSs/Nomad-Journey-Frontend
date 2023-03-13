import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewRequestPage from "./pages/NewRequest";
import SignInSide from "./pages/signup";

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/add-new-request">Add New Request</Link>
              </li>
            </ul>
          </nav>

          {/* <Routes>
            <Route path="/add-new-request" element={<NewRequestPage />}/>
          </Routes> */}
          <Routes>
            <Route path="/add-new-request" element={<SignInSide />}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
