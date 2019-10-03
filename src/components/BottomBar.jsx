import React from "react";
import { NavLink } from "react-router-dom";

import routes from "../routes";
import SvgIcon from "./SvgIcon";

export default function BottomBar() {
  return (
    <nav
      className="absolute bottom-0 w-full z-50 sm:hidden shadow-md"
      style={{
        background: "linear-gradient(-180deg, #3358f4 0%, #1d8cf8 100%)"
      }}
    >
      <ul className="flex flex-row justify-center">
        {routes
          .filter(e => e.showInSideBar)
          .map(prop => {
            return (
              <li key={prop.path} className="list-none">
                <NavLink
                  exact
                  to={prop.path}
                  className="flex flex-col justify-center align-center text-center py-3"
                >
                  <SvgIcon
                    d={prop.svg_path}
                    fill="#fff"
                    width="5em"
                    height="1.8em"
                    viewBox={prop.svg_viewbox}
                    className="opacity-75"
                    style={{ width: "100%" }}
                  />
                  <span
                    className="text tracking-wide mt-2"
                    style={{ fontSize: "0.8em" }}
                  >
                    {prop.name}
                  </span>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
