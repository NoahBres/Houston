import React, { useContext } from "react";
import PropTypes from "prop-types";

import Card from "./Card";

import SocketClient, { SocketState } from "../SocketClient";
import MissionControlContext from "../contexts/missionControlContext";
import AppContext from "../contexts/appContext";

const dotStyle = {
  width: "0.22rem",
  height: "0.22rem",
  marginLeft: "0.15rem",
  animation: "blink 300ms ease-in infinite alternate"
};

export default function SocketInfoCard({ className = "", height = "" }) {
  const [missionControlState] = useContext(MissionControlContext);
  const [appContext] = useContext(AppContext);

  function reconnect() {
    if (missionControlState.socketState === SocketState.DISCONNECTED)
      SocketClient.connect();
    else if (missionControlState.socketState === SocketState.CONNECTED)
      SocketClient.close();
  }

  return (
    <Card className={className} height={height}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Status</h2>
      </div>
      <div className="px-4 my-3 flex flex-col justify-between">
        <p className="font-light tracking-wider">
          {appContext.baseAddr}
          <span className="text-gray-500">:{appContext.socketPort}</span>
        </p>
        <p className="font-light tracking-wide">
          {(() => {
            if (missionControlState.socketState === SocketState.CONNECTED)
              return "Connected ✔";
            if (missionControlState.socketState === SocketState.DISCONNECTED)
              return "Disconnected ❌";
            return "Connecting";
          })()}
          <span
            className={
              missionControlState.socketState !== SocketState.CONNECTING
                ? "hidden"
                : ""
            }
          >
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
            missionControlState.socketState === SocketState.CONNECTING
              ? "text-gray-600 pointer-events-none"
              : ""
          }`}
          onClick={reconnect}
          type="button"
        >
          {(() => {
            if (missionControlState.socketState === SocketState.DISCONNECTED)
              return "Reconnect";
            if (missionControlState.socketState === SocketState.CONNECTED)
              return "Disconnect";
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
