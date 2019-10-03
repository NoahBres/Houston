import React, { useState, useEffect } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";

import routes from "./routes";
import SocketClient from "./SocketClient";
import AppContext from "./contexts/appContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";

export default function App() {
  const [appContextState, setAppContextState] = useState({
    baseAddr: "192.168.49.1",
    socketPort: "8889",
    httpPort: "8888"
  });

  useEffect(() => {
    SocketClient.connect(
      `${appContextState.baseAddr}:${appContextState.socketPort}`
    );
    SocketClient.addMessageListener(msg => {
      console.log(`received message: `, msg);
    });

    return function cleanup() {
      SocketClient.close();
    };
  }, []);

  return (
    <AppContext.Provider value={[appContextState, setAppContextState]}>
      <HashRouter>
        <Navbar title="Houston" />
        <div
          className="flex flex-row sm:pt-0 pt-5"
          style={{ height: "calc(100vh - 75px)", paddingBottom: "0.4em" }}
        >
          <Sidebar title="Team 16626" avatar="react-logo.png" />
          <BottomBar title="Team 16626" />
          <section className="content w-full">
            <Switch>
              {routes.map(prop => {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    exact={prop.exact}
                    key={prop.path}
                  />
                );
              })}
            </Switch>
          </section>
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}
