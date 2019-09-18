import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import SocketClient from "../SocketClient";
import MissionControlContext from "../contexts/missionControlContext";

import useInterval from "../hooks/useInterval";

// eslint-disable-next-line
import CanvasJSReact from "../lib/canvasjs/canvasjs.react";

// const { CanvasJS } = CanvasJSReact;
const { CanvasJSChart } = CanvasJSReact;

export default function AccelerometerGraphCard({
  className = "",
  dataThrottle = 1000 / 30 // 30 fps
}) {
  const sensorKeys = ["accelerometer-x", "accelerometer-y", "accelerometer-z"];

  const [accelerometerXValues, setAccelerometerXValues] = useState([]);
  const [accelerometerYValues, setAccelerometerYValues] = useState([]);
  const [accelerometerZValues, setAccelerometerZValues] = useState([]);

  const accelerometerXRaw = useRef();
  const accelerometerYRaw = useRef();
  const accelerometerZRaw = useRef();

  if (
    !accelerometerXRaw.current ||
    !accelerometerYRaw.current ||
    !accelerometerZRaw.current
  ) {
    accelerometerXRaw.current = [];
    accelerometerYRaw.current = [];
    accelerometerZRaw.current = [];
  }

  const chartRef = useRef();

  const chartOptions = {
    title: {
      text: "Accelerometer"
    },
    theme: "dark2",
    backgroundColor: "#27293d",
    data: [
      {
        type: "column",
        dataPoints: [{ label: "Apple", y: 10 }, { label: "Orange", y: 15 }]
      }
    ]
  };

  const [missionControlState] = useContext(MissionControlContext);

  useEffect(() => {
    const messageListener = msg => {
      const index = sensorKeys.indexOf(msg.tag);
      switch (index) {
        case 0:
          accelerometerXRaw.current.push([msg.msg, msg.time]);
          break;
        case 1:
          accelerometerYRaw.current.push([msg.msg, msg.time]);
          break;
        case 2:
          accelerometerZRaw.current.push([msg.msg, msg.time]);
          break;
        default:
          break;
      }
    };

    SocketClient.addMessageListener(messageListener);

    return () => {
      SocketClient.removeMessageListener(messageListener);
    };
  }, [sensorKeys]);

  useEffect(() => {
    if (missionControlState.isLogging) {
      setAccelerometerXValues([]);
      setAccelerometerYValues([]);
      setAccelerometerZValues([]);

      accelerometerXRaw.current = [];
      accelerometerYRaw.current = [];
      accelerometerZRaw.current = [];
    }
  }, [missionControlState.isLogging]);

  useInterval(() => {
    if (missionControlState.isLogging) {
      if (
        accelerometerXRaw.current &&
        accelerometerXRaw.current[accelerometerXRaw.current.length - 1] !==
          accelerometerXValues[accelerometerXValues.length - 1]
      ) {
        setAccelerometerXValues([
          ...accelerometerXValues,
          accelerometerXRaw.current[accelerometerXRaw.current.length - 1]
        ]);
      }
      if (
        accelerometerYRaw.current &&
        accelerometerYRaw.current[accelerometerYRaw.current.length - 1] !==
          accelerometerYValues[accelerometerYValues.length - 1]
      ) {
        setAccelerometerYValues([
          ...accelerometerYValues,
          accelerometerYRaw.current[accelerometerYRaw.current.length - 1]
        ]);
      }
      if (
        accelerometerZRaw.current &&
        accelerometerZRaw.current[accelerometerZRaw.current.length - 1] !==
          accelerometerZValues[accelerometerZValues.length - 1]
      ) {
        setAccelerometerZValues([
          ...accelerometerZValues,
          accelerometerZRaw.current[accelerometerZRaw.current.length - 1]
        ]);
      }
    }
  }, dataThrottle);

  return (
    <Card className={`${className} overflow-hidden p-6`}>
      <CanvasJSChart options={chartOptions} ref={chartRef}></CanvasJSChart>
    </Card>
  );
}

AccelerometerGraphCard.propTypes = {
  className: PropTypes.string,
  dataThrottle: PropTypes.number
};

AccelerometerGraphCard.defaultProps = {
  className: "",
  dataThrottle: 1000 / 30 // 30 fps
};
