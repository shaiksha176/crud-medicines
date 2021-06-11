import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import Navbar from "./Components/Navbar";

import PrivateRoute from "./Pages/Routing/PrivateRoute";
import Profile from "./Pages/Profile/Profile";
import UserContext from "./Context/UserContext";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Register/SignUp";
import Add from "./Pages/Medicine/Add";
import Update from "./Pages/Medicine/Update";
import UpdateProfile from "./Pages/Profile/UpdateProfile";
function App() {
  const history = useHistory();
  return (
    <Router>
      <UserContext>
        <Navbar />
        <Switch>
          <Route path="/" component={() => <Login />} exact />
          <Route path="/signup" component={SignUp} exact />
          <PrivateRoute exact path="/profile" component={() => <Profile />} />
          <PrivateRoute exact path="/add" component={() => <Add />} />
          <PrivateRoute exact path="/update" component={() => <Update />} />
          <PrivateRoute
            exact
            path="/update/profile"
            component={() => <UpdateProfile />}
          />
        </Switch>
      </UserContext>
    </Router>
  );
}

export default App;
