import React from "react";
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
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        {/* <Switch> */}
        <Routes>
          <Route path="/" element={<Users />} exact />
          {/* <Route path="/" exact>
          <Places />
        </Route> */}
          <Route path="/users" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/places/new" element={<Places />} />
          <Route path="*" element={<Navigate to="/" />} />{" "}
          {/* <Route path="*">
          <redirect to="/" />
        </Route> */}
        </Routes>
        {/* </Switch> */}
      </main>
    </Router>
  );
}

export default App;
