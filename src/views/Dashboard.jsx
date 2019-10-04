import React, { useState, useEffect } from "react";

import LogCard from "../components/dashboard/LogCard";
import SocketInfoCard from "../components/dashboard/SocketInfoCard";
import ValueTableCard from "../components/dashboard/ValueTableCard";
import CommandCard from "../components/dashboard/CommandCard";
import AccelerometerGraphCard from "../components/dashboard/AccelerometerGraphCard";

import useWindowSize from "../hooks/useWindowSize";

import SocketClient, { SocketState } from "../SocketClient";
import MissionControlContext from "../contexts/missionControlContext";

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
  }, [missionControlState]);

  useEffect(() => {
    const handleStateChange = state => {
      setMissionControlState({ ...missionControlState, socketState: state });
    };

    SocketClient.addStateChangeListener(handleStateChange);

    return () => {
      SocketClient.removeStateChangeListener(handleStateChange);
    };
  }, [missionControlState]);

  return (
    <main className="pr-3 pb-3 overflow-y-auto h-full pr-5 md:pr-0">
      <MissionControlContext.Provider
        value={[missionControlState, setMissionControlState]}
      >
        <div className="flex lg:flex-row flex-col mb-8">
          <SocketInfoCard
            className="lg:w-1/3 w-full"
            height={windowSize.innerHeight > 400 ? "20rem" : "13rem"}
          />
          <LogCard
            className="lg:w-2/3 w-full lg:mt-0 mt-8"
            height={windowSize.innerHeight > 400 ? "20rem" : "13rem"}
            filter={sensorList}
          />
        </div>
        <div className="flex lg:flex-row flex-col mt-8">
          <ValueTableCard
            className="lg:w-1/3 w-full"
            valueKeys={sensorList}
            dataThrottle={1000 / 30}
          />
          <CommandCard className="w-full lg:w-2/3 xl:w-1/3 lg:mt-0 mt-8" />
        </div>
        <div className="flex lg:flex-row flex-col mt-8">
          <AccelerometerGraphCard
            className="w-full"
            dataThrottle={1000 / 30}
            chartType="line"
          />
        </div>
      </MissionControlContext.Provider>
    </main>
  );
}
