import React, { useState, useEffect } from "react";

import LogCard from "../components/LogCard";

export default function Dashboard() {
  const windowSize = useWindowSize();

  return (
    <main className="pr-3 overflow-y-auto h-full">
      <div className="flex flex-row">
        <LogCard
          className="w-full"
          height={windowSize.innerHeight > 400 ? "20rem" : "13rem"}
          filter={["accelerometer"]}
        />
      </div>
    </main>
  );
}

function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  };
}

function useWindowSize() {
  let [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}
