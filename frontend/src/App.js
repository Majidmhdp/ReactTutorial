import React, { useState, useCallback } from "react";
// import { BrowserRouter as Router, Route, Switch, redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import Places from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} exact />
        <Route path="/users" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<Places />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} exact />
        <Route path="/users" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {/* <Switch> */}
          <Routes>
            {routes}
            {/* <Route path="/" element={<Users />} exact /> */}
            {/* <Route path="/" exact>
          <Places />
        </Route> */}
            {/* <Route path="*" element={<Navigate to="/" />} />{" "} */}
            {/* <Route path="*">
          <redirect to="/" />
        </Route> */}
          </Routes>
          {/* </Switch> */}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
