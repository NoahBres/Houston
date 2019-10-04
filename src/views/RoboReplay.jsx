import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import AppContext from "../contexts/appContext";

export default function RoboReplay({ match }) {
  const [appContext] = useContext(AppContext);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const { id } = match.params;
    // console.log(new Date(id.slice(0, -4).slice(4)));
    setTitle(id.slice(0, -4).slice(4));
  }, [match.params, match.params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://${appContext.baseAddr}:${appContext.httpPort}/log/${match.params.id}`
      );
      // const jsonResponse = await response;
      const textResponse = await response.text();
    };

    fetchData();
  });

  return (
    <main>
      <div className="flex flex-row mt-1">
        <h1 className="text-2xl">{title}</h1>
      </div>
    </main>
  );
}

RoboReplay.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object
};

RoboReplay.defaultProps = {
  match: {}
};
