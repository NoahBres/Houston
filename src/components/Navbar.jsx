import React from "react";
import PropTypes from "prop-types";

export default function Navbar({ title = "" }) {
  return (
    <nav className="w-full px-6 py-5">
      <h1 className="text-lg uppercase font-light tracking-wide py-1 mx-4 inline-block">
        {title}
      </h1>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string
};

Navbar.defaultProps = {
  title: ""
};
