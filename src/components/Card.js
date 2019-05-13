import React from "react";

export default function Card({ className = "", children = [], height = "" }) {
  return (
    <div
      className={`${className} bg-notblack shadow-lg rounded mx-3`}
      style={{ height: height }}
    >
      {children}
    </div>
  );
}
