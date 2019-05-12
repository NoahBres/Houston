import { Route, HashRouter, Switch } from "react-router-dom";

import routes from "./routes";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <HashRouter>
      <Navbar title="Houston" />
      <div className="flex flex-row" style={{ height: "calc(100vh - 75px)" }}>
        <Sidebar title="Team 10940" avatar="react-logo.png" />
        <section className="content w-full pl-2 pr-5">
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
