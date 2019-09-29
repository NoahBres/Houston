import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import AppContext from "../contexts/appContext";

export default function RoboReplay({ match }) {
  const [appContext] = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://${appContext.baseAddr}:${appContext.httpPort}/log/${match.params.id}`
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    };

    fetchData();
  });

  return (
    <main>
      <div className="flex flex-row mt-1">
        <h1 className="text-2xl">{match.params.id}</h1>
      </div>
    </main>
  );
}

RoboReplay.propTypes = {
  match: PropTypes.shape
};

RoboReplay.defaultProps = {
  match: {}
};
