import React, { Component } from "react";
import "./App.css";
import {CardContainerHorizontal} from "./components/CardContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <CardContainerHorizontal/>
      </div>
    );
  }
}

export default App;
