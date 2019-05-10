import React from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Logs from "./views/Logs";
import Settings from "./views/Settings";

export default function App() {
  return (
    <HashRouter>
      <ul className="list-disc pl-6">
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/logs">Logs</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Home</NavLink>
        </li>
      </ul>
      <div className="content">
        <Route exact path="/" component={Dashboard} />
        <Route path="/logs" component={Logs} />
        <Route path="/settings" component={Settings} />
      </div>
    </HashRouter>
  );
}
