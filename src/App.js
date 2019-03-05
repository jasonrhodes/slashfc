import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import routes from "./routes";

// temporary route handling until I write auth
const PublicRoute = Route;
const ProtectedRoute = Route;

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <BrowserRouter>
          <Switch>
            {routes.map(route => {
              // return <Route key={route.path} exact={true} {...route} />;
              const MyRoute = route.public ? PublicRoute : ProtectedRoute;

              route.exact = !(route.exact === false); // this makes exact default to true

              if (route.redirect) {
                return (
                  <Route
                    key={route.path}
                    exact
                    path={route.path}
                    render={({ location }) => (
                      <Redirect
                        to={{ ...location, pathname: route.redirect }}
                      />
                    )}
                  />
                );
              }

              return <MyRoute key={route.path} {...route} />;
            })}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
