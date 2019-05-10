import React from "react";
import { NavLink } from "react-router-dom";

import avatar_uri from "../../public/assets/react-logo.png";

export default function Sidebar(props) {
  return (
    <aside
      className="mx-5 my-3 mt-0 rounded w-56"
      style={{
        background: "linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)"
      }}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-lg text-white uppercase self-start mt-4 mb-3 ml-6">
          <img
            src={avatar_uri}
            className="w-10 h-10 rounded-full inline-block mr-2 mb-px"
          />{" "}
          {props.title}
        </h2>
        <div className="w-5/6 h-px bg-white opacity-50" />
      </div>
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
    </aside>
  );
}
