import React from "react";
import ReactDOM from "react-dom";

// import "./styles/app.scss";

class Component extends React.Component {
  render() {
    return (
      <div>
        <h2 className="text-blue-600 font-bold">yo</h2>
      </div>
    );
  }
}

const App = document.getElementById("app");
ReactDOM.render(<Component />, App);
