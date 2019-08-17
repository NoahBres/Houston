import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import SocketClient from "../SocketClient";
import useInterval from "../hooks/useInterval";

export default function LiveValueGraph({
  className = "",
  valueKeys = [],
  renderDelay = 1000 / 30 // 30 fps
}) {
  useEffect(() => {
    const messageListener = msg => {
      // if(valueKeys.includes(msg.tag))
    };

    SocketClient.addMessageListener(messageListener);

    return () => {
      SocketClient.removeMessageListener(messageListener);
    };
  });

  return <Card className={`${className}`}>Test</Card>;
}

LiveValueGraph.propTypes = {
  className: PropTypes.string,
  valueKeys: PropTypes.arrayOf(PropTypes.string),
  renderDelay: PropTypes.number
};

LiveValueGraph.defaultProps = {
  className: "",
  valueKeys: [],
  renderDelay: 1000 / 30 // 30 fps
};
