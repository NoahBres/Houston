import React, { useState, useEffect } from "react";

const Dropdown = React.forwardRef(
  (
    { open = false, style = "", className = "", position = "bottom", children },
    ref
  ) => {
    const styles = {
      position: "absolute",
      top: position == "bottom" ? "100%" : "",
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
          opacity: open ? "1" : "0"
        }}
      >
        {children}
      </div>
    );
  }
);

export default Dropdown;
