import React from "react";
import { Route, HashRouter } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Logs from "./views/Logs";
import Settings from "./views/Settings";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <HashRouter>
      <Navbar title="Houston" />
      <div className="flex flex-row" style={{ height: "calc(100vh - 75px)" }}>
        <Sidebar title="Team 10940" avatar="react-logo.png" />
        <section className="content">
          <Route exact path="/" component={Dashboard} />
          <Route path="/logs" component={Logs} />
          <Route path="/settings" component={Settings} />
        </section>
      </div>
    </HashRouter>
  );
}
