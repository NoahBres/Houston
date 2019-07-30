import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Card from "./Card";

import SocketClient from "../SocketClient";

const dotStyle = {
  width: "0.22rem",
  height: "0.22rem",
  marginLeft: "0.15rem",
  animation: "blink 300ms ease-in infinite alternate"
};

export default function SocketInfoCard({ className = "", height = "" }) {
  const [socketState, setSocketState] = useState("disconnected");

  function reconnect() {
    if (socketState === "disconnected") SocketClient.connect();
    else if (socketState === "connected") SocketClient.close();
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
        <p className="font-light tracking-wider">
          {SocketClient.address.split(":")[0]}
          <span className="text-gray-500">
            :{SocketClient.address.split(":")[1]}
          </span>
        </p>
        <p className="font-light tracking-wide">
          {(() => {
            if (socketState === "connected") return "Connected ✔";
            if (socketState === "disconnected") return "Disconnected ❌";
            return "Connecting";
          })()}
          <span className={socketState !== "connecting" ? "hidden" : ""}>
            <span
              className="dot first rounded-full bg-white inline-block"
              style={{
                ...dotStyle
              }}
            />
            <span
              className="dot second rounded-full bg-white inline-block"
              style={{
                ...dotStyle,
                animationDelay: "100ms"
              }}
            />
            <span
              className="dot third rounded-full bg-white inline-block"
              style={{
                ...dotStyle,
                animationDelay: "200ms"
              }}
            />
          </span>
        </p>
        <button
          className={`mt-20 transition-300-ease ${
            socketState === "connecting"
              ? "text-gray-600 pointer-events-none"
              : ""
          }`}
          onClick={reconnect}
          type="button"
        >
          {(() => {
            if (socketState === "disconnected") return "Reconnect";
            if (socketState === "connected") return "Disconnect";
            return "";
          })()}
        </button>
      </div>
    </Card>
  );
}

SocketInfoCard.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string
};

SocketInfoCard.defaultProps = {
  className: "",
  height: ""
};