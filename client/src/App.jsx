// React
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Utils
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser } from "./actions/authActions";

// Components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Layout from "./components/dashboard/Layout";
// Style
import "./App.scss";
import "./styles/dashboard-modern.scss";

// Restore a valid saved session, discarding expired or malformed tokens.
const storedToken = localStorage.getItem("jwtTokenTeams");
if (storedToken) {
  try {
    const authorization = JSON.parse(storedToken);
    const token = authorization.replace(/^Bearer\s+/i, "");
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 <= Date.now()) throw new Error("Session expired");
    setAuthToken("Bearer " + token);
    store.dispatch(setCurrentUser(decoded));
  } catch (error) {
    localStorage.removeItem("jwtTokenTeams");
    setAuthToken(false);
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Layout} />
              <PrivateRoute component={Layout} />
                   
            </Switch>
         
          </div>
        </Router>
      </Provider>
      
    );
  }
}
export default App;
