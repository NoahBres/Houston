import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "../contexts/appContext";

export default function Logs() {
  const [appContext] = useContext(AppContext);

  const [logList, setLogList] = useState([]);

  useEffect(() => {
    const sortLogList = list => {
      return list.sort((a, b) => {
        const firstDate = new Date(a.slice(0, -4).slice(4));
        const secondDate = new Date(b.slice(0, -4).slice(4));
        return secondDate - firstDate;
      });
    };

    const fetchLogList = async () => {
      const response = await fetch(
        `http://${appContext.baseAddr}:${appContext.httpPort}/logs`
      );
      const jsonResponse = await response.json();
      const logs = jsonResponse.fileNames;

      setLogList(sortLogList(logs));
    };

    fetchLogList();
  }, [appContext.baseAddr, appContext.httpPort]);

  return (
    <main className="mx-3 flex flex-col h-full overflow-auto">
      <h2 className="text-2xl mb-4">Logs</h2>
      <ul style={{ flex: "1" }}>
        {logList.map(item => (
          <li key={item} className="">
            <Link
              to={`/log/${item}`}
              className="p-2 inline-block hover:text-gray-600 transition-300-ease"
              style={{ fontFamily: '"Lucida Console", Monaco, monospace' }}
            >
              {item}
            </Link>
          </li>
        ))}
        <h3 className={`${logList.length === 0 ? "" : "hidden"} text-lg`}>
          You have no logs
          <span role="img" aria-label="smiling emoji" className="pl-2">
            😊
          </span>
        </h3>
      </ul>
    </main>
  );
}
