import React, { useState, useEffect } from "react";

import LogCard from "../components/LogCard";
import SocketInfoCard from "../components/SocketInfoCard";
import ValueTableCard from "../components/ValueTableCard";
import CommandCard from "../components/CommandCard";
import AccelerometerGraphCard from "../components/AccelerometerGraphCard";

import useWindowSize from "../hooks/useWindowSize";

import SocketClient from "../SocketClient";
import MissionControlContext from "../contexts/missionControlContext";

const SocketState = {
  DISCONNECTED: "disconnected",
  CONNECTED: "connected",
  CONNECTING: "connecting"
};

export default function Dashboard() {
  const windowSize = useWindowSize();

  const [sensorList, setSensorList] = useState([]);
  const [missionControlState, setMissionControlState] = useState({
    socketState: SocketState.DISCONNECTED,
    isLogging: false
  });

  useEffect(() => {
    const messageListener = msg => {
      if (msg.tag === "init") {
        const payload = JSON.parse(msg.msg);
        setSensorList(payload["sensor-keys"]);
      }

      if (msg.tag === "status") {
        if (msg.msg === "logging on") {
          setMissionControlState({ ...missionControlState, isLogging: true });
        } else if (msg.msg === "logging off") {
          setMissionControlState({ ...missionControlState, isLogging: false });
        }
      }
    };

    SocketClient.addMessageListener(messageListener);

    return () => {
      SocketClient.removeMessageListener(messageListener);
    };
  });

  return (
    <main className="pr-3 pb-3 overflow-y-auto h-full">
      <MissionControlContext.Provider
        value={[missionControlState, setMissionControlState]}
      >
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
            dataThrottle={1000 / 30}
          />
          <CommandCard className="w-1/3" />
        </div>
        <div className="flex flex-row mt-8">
          <AccelerometerGraphCard className="w-full" renderDelay={1000 / 30} />
        </div>
      </MissionControlContext.Provider>
    </main>
  );
}

export { SocketState };
