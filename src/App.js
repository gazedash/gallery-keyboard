import React, { Component } from "react";
import "./App.css";
import {CardContainerVertical} from "./components/CardContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <CardContainerVertical/>
      </div>
    );
  }
}

export default App;
