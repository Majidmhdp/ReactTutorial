import React, { useState, useCallback, useEffect } from "react";
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

let logoutTimer;

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem("userData", JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
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
      value={{ isLoggedIn: !!token, userId, token, login: login, logout: logout }}
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
