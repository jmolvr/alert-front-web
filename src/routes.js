import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Alerts from "./pages/Alerts";
import Login from "./pages/Login";
import IndividualAlert from "./pages/IndividualAlert";
import Welcome from "./pages/Welcome";
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/alertas" exact component={Alerts} />
      <PrivateRoute path="/alertas/:handle" exact component={IndividualAlert} />
      <Route exact component={() => <h1>Error 404</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
