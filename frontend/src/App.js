import React from "react";
// import { BrowserRouter as Router, Route, Switch, redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./users/users";
import Places from "./places/places";

function App() {
  return (
    <Router>
      {/* <Switch> */}
      <Routes>
        <Route path="/" element={<Places />} exact />
        {/* <Route path="/" exact>
          <Places />
        </Route> */}
        <Route path="/users" element={<Users />} />
        <Route path="/places" element={<Places />} />
        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/* <Route path="*">
          <redirect to="/" />
        </Route> */}
      </Routes>
      {/* </Switch> */}
    </Router>
  );
}

export default App;
