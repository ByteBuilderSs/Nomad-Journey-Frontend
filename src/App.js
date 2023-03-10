import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewRequestPage from "./pages/NewRequest";

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

          <Switch>
            <Route path="/add-new-request">
              <NewRequestPage />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
