import React, { Suspense } from "react";
// import { BrowserRouter as Router, Route, Switch, redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import UserPlaces from "./places/pages/UserPlaces";
// import Places from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hooks";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const Places = React.lazy(() => import("./places/pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

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
      value={{
        isLoggedIn: !!token,
        userId,
        token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          {/* <Switch> */}
          <Routes>
            <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>
              {routes}
            </Suspense>
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
