import React from "react";
import PropTypes from "prop-types";

const tinyArrowStyle = {
  borderTop: "0",
  borderRight: "0.4em solid transparent",
  borderBottom: "0.4em solid #fff",
  borderLeft: "0.4em solid transparent",
  top: "-0.4em",
  right: "0.8em"
};

const Dropdown = React.forwardRef(
  (
    { open = false, style = "", className = "", position = "bottom", children },
    ref
  ) => {
    const styles = {
      position: "absolute",
      top: position === "bottom" ? "100%" : "",
      bottom: "",
      left: "",
      right: "0"
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...style,
          ...styles,
          transform: open ? "translateY(0)" : "translateY(-0.6em)",
          opacity: open ? "1" : "0",
          pointerEvents: open ? "" : "none"
        }}
      >
        <span className="absolute" style={tinyArrowStyle} />
        {children}
      </div>
    );
  }
);

Dropdown.propTypes = {
  open: PropTypes.boolean,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  className: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
};

Dropdown.defaultProps = {
  open: false,
  style: {},
  className: "",
  position: "bottom",
  children: []
};

export default Dropdown;
