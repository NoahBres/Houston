import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import useStayScrolled from "react-stay-scrolled";

import Card from "./Card";

import SocketClient from "../SocketClient";

export default function LogCard(props) {
  const [logs, setLogs] = useState([]);

  const { windowHeight, windowWidth } = useWindowDimensions();

  const listRef = useRef(null);
  const { stayScrolled } = useStayScrolled(listRef);

  const messageListener = msg => {
    setLogs(l => l.concat(msg));
  };

  useEffect(() => {
    SocketClient.addMessageListener(messageListener);

    // setInterval(() => {
    //   messageListener(`test`);
    // }, 2000);

    return function cleanup() {
      SocketClient.removeMessageListener(messageListener);
    };
  }, []);

  useLayoutEffect(() => {
    stayScrolled();
  }, [logs]);

  return (
    <Card className={props.className} height={props.height}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Logging</h2>
      </div>
      <div className="px-4 my-3">
        <ul
          ref={listRef}
          className="overflow-auto"
          style={{ height: windowHeight > 400 ? "20rem" : "13rem" }}
        >
          {logs.map((e, i) => (
            <li key={i}>
              {i} {e}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
