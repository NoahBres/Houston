import React, { useEffect } from "react";

import Card from "./Card";

import SocketClient from "../SocketClient";

export default function ValueTableCard({ className = "", style = {} }) {
  const messageListener = msg => {};

  useEffect(() => {
    SocketClient.addMessageListener(messageListener);

    return () => {
      SocketClient.removeMessageListener(messageListener);
    };
  }, []);

  return (
    <Card className={`p-5 ${className}`} style={style}>
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
            <tr className="border-b border-gray-700">
              <td className="px-2 py-3 pr-5">Linear-x</td>
              <td className="px-2 py-3 pr-5">-0.4532</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-2 py-3 pr-5">Linear-y</td>
              <td className="px-2 py-3 pr-5">9.6345</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
