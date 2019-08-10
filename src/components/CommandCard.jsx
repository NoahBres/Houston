import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Card from "./Card";

import SocketClient from "../SocketClient";

function CommandCard({ className = "" }) {
  const [isLogging, setIsLogging] = useState(false);

  const [socketState, setSocketState] = useState("disconnected");

  const [inputState, setInputState] = useState("");

  function handleRemoteLoggingClick() {
    const startOrStop = !isLogging ? "start" : "stop";
    SocketClient.sendMessage(`logging-${startOrStop}`, "cmd");
    setIsLogging(i => !i);
  }

  function handleInputChange(event) {
    setInputState(event.target.value);
  }

  function handleSendInput() {
    console.log(inputState);
  }

  function handleInputKeydown(event) {
    if (event.key === "Enter") {
      handleSendInput();
    }
  }

  useEffect(() => {
    function handleStateChange(state) {
      setSocketState(state);
    }

    SocketClient.addStateChangeListener(handleStateChange);

    return () => SocketClient.removeStateChangeListener(handleStateChange);
  }, []);

  return (
    <Card className={`${className} relative`}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Commands</h2>
      </div>
      <div className="px-4 my-3">
        <div className="flex flex-row py-2 items-center">
          <p className="font-light tracking-wide">Remote Logging:</p>
          <button
            className={`ml-3 text-black uppercase tracking-wide font-medium text-sm ${
              isLogging
                ? "bg-red-700 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-700"
            } px-3 py-1 rounded transition-300-ease`}
            onClick={handleRemoteLoggingClick}
            type="button"
          >
            {isLogging ? "Stop" : "Start"}
          </button>
        </div>
        <div className="flex flex-row py-3 pt-6">
          <input
            className="bg-notblack-lighter leading-tight text-gray-500 appearance-none rounded-full w-full text-gray-700 px-4 py-2 focus:outline-none focus:bg-white border-2 border-notblack-lighter focus:border-purple-500 transition-300-ease"
            type="text"
            placeholder="Type your command"
            value={inputState}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
          <button
            className="px-3 py-2 hover:text-gray-500 transition-300-ease"
            onClick={handleSendInput}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
      <div
        className={`${
          socketState === "connected" ? "hidden" : ""
        } absolute w-full h-full opacity-75 top-0 left-0 z-10 bg-notblack`}
      />
    </Card>
  );
}

CommandCard.propTypes = {
  className: PropTypes.string
};

CommandCard.defaultProps = {
  className: ""
};

export default CommandCard;
