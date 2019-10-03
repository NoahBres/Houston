import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import routes from "../routes";
import SvgIcon from "./SvgIcon";

import avatarUI from "../../public/assets/react-logo.png";

export default function Sidebar({ title = "" }) {
  return (
    <aside
      className="mx-5 my-3 mr-2 md:mr-5 mt-0 rounded w-56 sm:block hidden"
      style={{
        background: "linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)",
        minWidth: "190px"
      }}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-lg uppercase self-start mt-4 mb-3 ml-6">
          <img
            src={avatarUI}
            className="w-8 h-8 rounded-full inline-block mr-3 mb-px"
            alt="avatar"
          />
          {title}
        </h2>
        <div className="w-5/6 h-px mb-4 bg-white opacity-50" />
      </div>
      <ul className="list-disc pl-6">
        {routes
          .filter(e => e.showInSideBar)
          .map(prop => {
            return (
              <li key={prop.path} className="list-none">
                <NavLink
                  exact
                  to={prop.path}
                  className="flex flex-row items-center text-center py-5"
                >
                  <SvgIcon
                    d={prop.svg_path}
                    fill="#fff"
                    width="1.1rem"
                    viewBox={prop.svg_viewbox}
                    className="ml-2 mr-4 opacity-75"
                  />
                  <span className="uppercase text tracking-wide">
                    {prop.name}
                  </span>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  title: PropTypes.string
};

Sidebar.defaultProps = {
  title: ""
};
