import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "../contexts/appContext";

export default function Logs() {
  const [appContext] = useContext(AppContext);

  const [logList, setLogList] = useState([]);

  useEffect(() => {
    const fetchLogList = async () => {
      const response = await fetch(
        `http://${appContext.baseAddr}:${appContext.httpPort}/logs`
      );
      const jsonResponse = await response.json();
      const logs = jsonResponse.fileNames;
      setLogList(logs);
    };

    fetchLogList();
  }, [appContext.baseAddr, appContext.httpPort]);

  return (
    <main>
      <h2 className="text-2xl mb-4">Logs</h2>
      <ul>
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
      </ul>
    </main>
  );
}
