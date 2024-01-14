import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

const App: React.FC = () => {
  const appStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Switch>
          <Route path="/user-details/:userId" component={UserDetails} />
          <Route path="/" component={UserList} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
