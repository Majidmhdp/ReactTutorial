import React from "react";
// import { BrowserRouter as Router, Route, Switch, redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Users from "./users/pages/Users";
import Places from "./places/pages/NewPlace";

function App() {
  return (
    <Router>
      {/* <Switch> */}
      <Routes>
        <Route path="/" element={<Users />} exact />
        {/* <Route path="/" exact>
          <Places />
        </Route> */}
        <Route path="/users" element={<Users />} />
        <Route path="/places/new" element={<Places />} />
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
