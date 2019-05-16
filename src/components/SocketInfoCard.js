import React, { useState, useEffect } from "react";

import Card from "./Card";

import SocketClient from "../SocketClient";

export default function SocketInfoCard({ className = "", height = "" }) {
  const [socketOpen, setSocketOpen] = useState(false);

  useEffect(() => {
    function handleOpenClose(open) {
      setSocketOpen(open);
    }

    SocketClient.addOpenCloseListener(handleOpenClose);

    return () => SocketClient.removeOpenCloseListener(handleOpenClose);
  }, []);

  return (
    <Card className={className} height={height}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Status</h2>
      </div>
      <div className="px-4 my-3">
        <p>{socketOpen ? "open" : "false"}</p>
      </div>
    </Card>
  );
}
