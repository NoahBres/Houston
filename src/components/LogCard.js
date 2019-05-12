import React from "react";

import Card from "./Card";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

export default function LogCard() {
  return (
    <Card className="h-56" width="1">
      <CardHeader>
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Logging</h2>
      </CardHeader>
    </Card>
  );
}
