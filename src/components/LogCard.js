import React, { useState, useEffect } from "react";

import Card from "./Card";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

import SocketClient from "../SocketClient";

export default function LogCard() {
  const [logs, setLogs] = useState([]);

  const messageListener = msg => {
    // setLogs(m => m.concat(msg));
    setLogs(l => l.concat(msg, msg));
  };

  useEffect(() => {
    SocketClient.addMessageListener(messageListener);

    return function cleanup() {
      SocketClient.removeMessageListener(messageListener);
    };
  }, []);

  return (
    <Card className="h-64" width="1">
      <CardHeader>
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Logging</h2>
      </CardHeader>
      <CardBody>
        <ul>
          {logs.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
