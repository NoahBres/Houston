import React from "react";

export default function Navbar(props) {
  return (
    <nav className="w-full px-6 py-5">
      <h1 className="text-lg uppercase font-light tracking-wide py-1 mx-4 inline-block">
        {props.title}
      </h1>
    </nav>
  );
}
