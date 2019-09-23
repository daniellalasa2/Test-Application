import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
function App() {
  var loading = () => {
    return (
      <div>
        <strong>Loading ...</strong>
      </div>
    );
  };
  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              path="/listing"
              name="Layout"
              component={props => <Layout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
