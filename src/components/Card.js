import React from "react";

export default function Card({
  style = {},
  width = 3,
  className = "",
  children = []
}) {
  const getWidth = () => {
    switch (`${width}`) {
      case "3":
        return "w-full";
      case "2":
        return "w-2/3";
      case "1":
        return "w-1/3";
      default:
        return "w-full";
    }
  };

  return (
    <div
      className={`${className} bg-notblack shadow-lg rounded ${getWidth()}`}
      style={style}
    >
      {children}
    </div>
  );
}
