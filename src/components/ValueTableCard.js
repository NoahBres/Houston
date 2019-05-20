import React, { useState, useEffect } from "react";

import Card from "./Card";

import SocketClient from "../SocketClient";
import useInterval from "../hooks/useInterval";

export default function ValueTableCard({
  className = "",
  style = {},
  valueKeys = [],
  renderDelay = 16
}) {
  const [valueTable, setValueTable] = useState(
    valueKeys.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {})
  );

  // Copy of value table but only changes at 60fps
  const [renderedValueTable, setRenderedValueTable] = useState(
    valueKeys.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {})
  );

  useInterval(() => {
    setRenderedValueTable(o => Object.assign(o, valueTable));
  }, renderDelay);

  const messageListener = msg => {
    if (valueKeys.includes(msg["tag"]))
      setValueTable({ ...valueTable, [msg["tag"]]: msg["msg"] });
  };

  useEffect(() => {
    SocketClient.addMessageListener(messageListener);

    return () => {
      SocketClient.removeMessageListener(messageListener);
    };
  }, []);

  return (
    <Card className={`${className}`}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Values</h2>
      </div>
      <div className="px-4 my-3">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-2 py-3 text-left">Name</th>
              <th className="px-2 py-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(renderedValueTable).map(([key, value], i) => (
              <tr className="border-b border-gray-700" key={key}>
                <td className="px-2 py-3 pr-5 w-1/2">{key}</td>
                <td className="px-2 py-3 pr-5 w-1/2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
