import React, { useState, useEffect } from "react";

import LogCard from "../components/LogCard";
import SocketInfoCard from "../components/SocketInfoCard";

import useWindowSize from "../hooks/useWindowSize";

export default function Dashboard() {
  const windowSize = useWindowSize();

  return (
    <main className="pr-3 overflow-y-auto h-full">
      <div className="flex flex-row">
        <SocketInfoCard
          className="w-1/3"
          height={windowSize.innerHeight > 400 ? "20rem" : "13rem"}
        />
        <LogCard
          className="w-2/3"
          height={windowSize.innerHeight > 400 ? "20rem" : "13rem"}
          filter={["accelerometer"]}
        />
      </div>
    </main>
  );
}
