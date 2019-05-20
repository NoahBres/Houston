import React from "react";

import Card from "./Card";

import SocketClient from "../SocketClient";

export default function CommandCard({ className = "" }) {
  return (
    <Card className={`${className}`}>
      <div className="px-4 pt-4">
        <h5 className="text-xs font-light text-gray-600">Real time</h5>
        <h2 className="text-3xl font-thin">Commands</h2>
      </div>
      <div className="px-4 my-3">
        <div className="flex flex-row self-end">
          <input className=" bg-notblack-lighter leading-tight text-gray-500 appearance-none rounded-full w-full text-gray-700 px-3 py-2 focus:outline-none focus:bg-white border-2 border-notblack-lighter focus:border-purple-500 transition-300-ease" type="text" placeholder="Type your command"/>
          <button className="px-3 py-2">Send</button>
        </div>
      </div>
    </Card>
  );
}
