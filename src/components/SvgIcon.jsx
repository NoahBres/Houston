import React from "react";
import PropTypes from "prop-types";

export default function SvgIcon({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  pathClassName = "",
  // viewBox="0 0 32 32",
  viewBox = [32, 32],
  d = ""
}) {
  return (
    <svg
      width={width}
      height={width}
      style={{ ...style, height: width, width }}
      viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {d.map(path => {
        return (
          <path fill={fill} d={path} key={path} className={pathClassName} />
        );
      })}
    </svg>
  );
}

SvgIcon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  fill: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  pathClassName: PropTypes.string,
  viewBox: PropTypes.arrayOf(PropTypes.number),
  d: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

SvgIcon.defaultProps = {
  style: {},
  fill: "#000",
  width: "100%",
  className: "",
  pathClassName: "",
  viewBox: [32, 32],
  d: ""
};
