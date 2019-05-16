import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import useStayScrolled from "react-stay-scrolled";

import Card from "./Card";

import SocketClient from "../SocketClient";

export default function LogCard({ className = "", height = "", filter = [] }) {
  const [logs, setLogs] = useState([]);

  const listRef = useRef(null);
  const { stayScrolled } = useStayScrolled(listRef);

  const messageListener = msg => {
    console.log(msg["msg"]);
    if (filter.includes(msg["tag"])) return;

    const logToArray = [[msg["msg"], msg["tag"], msg["time"]]];
    setLogs(l => l.concat(logToArray));
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
    <Card className={className} height={height}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Logging</h2>
      </div>
      <div className="px-4 my-3" style={{ height: "calc(100% - 7rem)" }}>
        <ul ref={listRef} className="overflow-auto h-full">
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
