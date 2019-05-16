import React, { useState, useEffect } from "react";

import Card from "./Card";

import SocketClient from "../SocketClient";

export default function SocketInfoCard({ className = "", height = "" }) {
  const [socketState, setSocketState] = useState("disconnected");

  function reconnect() {
    SocketClient.connect();
  }

  useEffect(() => {
    function handleStateChange(state) {
      setSocketState(state);
    }

    SocketClient.addStateChangeListener(handleStateChange);

    return () => SocketClient.removeStateChangeListener(handleStateChange);
  }, []);

  return (
    <Card className={className} height={height}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Status</h2>
      </div>
      <div className="px-4 my-3 flex flex-col justify-between">
        <p className="font-light tracking-wider">{SocketClient.address}</p>
        <p className="font-light tracking-wide">
          {socketState == "connected"
            ? "Connected ✔"
            : socketState == "disconnected"
            ? "Disconnected ❌"
            : "Connecting..."}
        </p>
        <button
          className={`mt-20 ${
            socketState == "connected"
              ? "text-gray-600 pointer-events-none"
              : ""
          }`}
          onClick={reconnect}
        >
          Reconnect
        </button>
      </div>
    </Card>
  );
}
