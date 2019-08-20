import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Card from "./Card";

import SocketClient from "../SocketClient";
import useInterval from "../hooks/useInterval";

export default function ValueTableCard({
  className = "",
  valueKeys = [],
  renderDelay = 1000 / 30 // 30 fps
}) {
  const valueTableRaw = useRef();

  if (!valueTableRaw.current) {
    valueTableRaw.current = valueKeys.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});
  }

  // Copy of value table but only changes at 60fps
  const [renderedValueTable, setRenderedValueTable] = useState(
    valueKeys.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {})
  );

  useInterval(() => {
    setRenderedValueTable(o => Object.assign(o, valueTableRaw.current));
  }, renderDelay);

  useEffect(() => {
    valueTableRaw.current = valueKeys.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});

    const messageListener = msg => {
      if (valueKeys.includes(msg.tag)) valueTableRaw.current[msg.tag] = msg.msg;
    };

    SocketClient.addMessageListener(messageListener);

    return () => {
      SocketClient.removeMessageListener(messageListener);
    };
  }, [valueKeys]);

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
              <th className="px-2 py-3 text-left font-semibold">Name</th>
              <th className="px-2 py-3 text-left font-semibold">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(renderedValueTable).map(([key, value]) => (
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

ValueTableCard.propTypes = {
  className: PropTypes.string,
  valueKeys: PropTypes.arrayOf(PropTypes.string),
  renderDelay: PropTypes.number
};

ValueTableCard.defaultProps = {
  className: "",
  valueKeys: [],
  renderDelay: 1000 / 30 // 30 fps
};
