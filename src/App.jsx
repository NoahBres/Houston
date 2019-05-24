import React, { useState, useEffect } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";

import routes from "./routes";
import SocketClient from "./SocketClient";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [socketAddress, setSocketAddress] = useState("192.168.49.1:8889");

  useEffect(() => {
    SocketClient.connect(socketAddress);
    SocketClient.addMessageListener(msg => {
      console.log(`received message: `, msg);
    });

    return function cleanup() {
      SocketClient.close();
    };
  }, []);

  return (
    <HashRouter>
      <Navbar title="Houston" />
      <div className="flex flex-row" style={{ height: "calc(100vh - 75px)" }}>
        <Sidebar title="Team 10940" avatar="react-logo.png" />
        <section className="content w-full">
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  component={prop.component}
                  exact={prop.exact}
                  key={key}
                />
              );
            })}
          </Switch>
        </section>
      </div>
    </HashRouter>
  );
}
