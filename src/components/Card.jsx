import React from "react";
import PropTypes from "prop-types";

function Card({ className = "", children = [], height = "" }) {
  return (
    <div
      className={`${className} bg-notblack shadow-lg rounded mx-3`}
      style={{ height }}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  height: PropTypes.string
};

Card.defaultProps = {
  className: "",
  children: [],
  height: ""
};

export default Card;
