import React from "react";

export default function SvgIcon({
  style={},
  fill="#000",
  width="100%",
  className="",
  // viewBox="0 0 32 32",
  viewBox=[32, 32],
  d=""
}) {
  return(
    <svg
      width={width}
      height={width}
      style={style}
      viewBox={`0 0 ${viewBox[0]} ${viewBox[1]}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {
        d.map((path, key) => {
          return (
            <path fill={fill} d={path} key={key}/>
          )
        })
      }
    </svg>
  )
}