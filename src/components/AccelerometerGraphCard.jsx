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
  dataThrottle = 1000 / 30, // 30 fps
  chartType = "line"
}) {
  const sensorKeys = ["accelerometer-x", "accelerometer-y", "accelerometer-z"];

  const [offsetTime, setOffsetTime] = useState(0);
  const [isOffsetTimeSet, setIsOffsetTimeSet] = useState(false);

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
    toolTip: {
      shared: true
    },
    axisY: {
      maximum: 20,
      minimum: -20
    },
    axisX: {
      maxium: 30,
      minimum: 0
    },
    data: [
      {
        type: chartType,
        xValueFormatString: "#.### seconds",
        showInLegend: true,
        name: "X",
        dataPoints: accelerometerXValues
      },
      {
        type: chartType,
        xValueFormatString: "#.### seconds",
        showInLegend: true,
        name: "Y",
        dataPoints: accelerometerYValues
      },
      {
        type: chartType,
        xValueFormatString: "#.### seconds",
        showInLegend: true,
        name: "Z",
        dataPoints: accelerometerZValues
      }
    ]
  };

  const [missionControlState] = useContext(MissionControlContext);

  useEffect(() => {
    const messageListener = msg => {
      const index = sensorKeys.indexOf(msg.tag);

      if (index === -1) return;

      if (!isOffsetTimeSet) {
        setOffsetTime(new Date(msg.time).getTime());
        setIsOffsetTimeSet(true);
      }

      switch (index) {
        case 0:
          accelerometerXRaw.current.push({
            y: parseFloat(msg.msg, 10),
            x: (new Date(msg.time).getTime() - offsetTime) / 1000
          });
          break;
        case 1:
          accelerometerYRaw.current.push({
            y: parseFloat(msg.msg, 10),
            x: (new Date(msg.time).getTime() - offsetTime) / 1000
          });
          break;
        case 2:
          accelerometerZRaw.current.push({
            y: parseFloat(msg.msg, 10),
            x: (new Date(msg.time).getTime() - offsetTime) / 1000
          });
          break;
        default:
          break;
      }

      // chartRef.current.render();
    };

    SocketClient.addMessageListener(messageListener);

    return () => {
      SocketClient.removeMessageListener(messageListener);
    };
  }, [isOffsetTimeSet, offsetTime, sensorKeys]);

  useEffect(() => {
    if (missionControlState.isLogging) {
      setAccelerometerXValues([]);
      setAccelerometerYValues([]);
      setAccelerometerZValues([]);

      accelerometerXRaw.current = [];
      accelerometerYRaw.current = [];
      accelerometerZRaw.current = [];

      setIsOffsetTimeSet(false);
      chartRef.current.render();
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
  dataThrottle: PropTypes.number,
  chartType: PropTypes.string
};

AccelerometerGraphCard.defaultProps = {
  className: "",
  dataThrottle: 1000 / 30, // 30 fps
  chartType: "line"
};
