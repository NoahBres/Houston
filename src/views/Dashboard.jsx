import React from "react";

import LogCard from "../components/LogCard";
import SocketInfoCard from "../components/SocketInfoCard";
import ValueTableCard from "../components/ValueTableCard";
import CommandCard from "../components/CommandCard";

import useWindowSize from "../hooks/useWindowSize";

export default function Dashboard() {
  const windowSize = useWindowSize();

  const sensorList = ["accelerometer"];

  return (
    <main className="pr-3 pb-3 overflow-y-auto h-full">
      <div className="flex flex-row mb-8">
        <SocketInfoCard
          className="w-1/3"
          height={windowSize.innerHeight > 400 ? "20rem" : "13rem"}
        />
        <LogCard
          className="w-2/3"
          height={windowSize.innerHeight > 400 ? "20rem" : "13rem"}
          filter={sensorList}
        />
      </div>
      <div className="flex flex-row mt-8">
        <ValueTableCard
          className="w-1/3"
          valueKeys={sensorList}
          renderDelay={1000 / 60}
        />
        <CommandCard className="w-1/3" />
      </div>
    </main>
  );
}