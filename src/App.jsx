import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewRequestPage from "./pages/NewRequest";
import UserPanelPage from "./pages/UserPanel";
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
                <Link to="/my-profile">UserPanel</Link>
            </li>
            </ul>
          </nav>

          <Routes>
              <Route path="/add-new-request" element={<NewRequestPage />}/>
              <Route path="/my-profile" element={<UserPanelPage />}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
