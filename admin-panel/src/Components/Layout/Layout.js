import React, { Suspense } from "react";
import Routes from "../Routes/Routes";
import { Route, Switch } from "react-router-dom";
import "./Layout.scss";
export default class Layout extends React.Component {
  render() {
    return (
      <div className="Layout">
        {/* Routes */}
        <Suspense>
          <Switch>
            {Routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => <route.component {...props} />}
              />
            ))}
          </Switch>
        </Suspense>
      </div>
    );
  }
}
