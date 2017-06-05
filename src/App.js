import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import VerticalCardList from "./components/VerticalCardList";

class App extends Component {
  render() {
    return (
      <div className="App">
          <VerticalCardList />
      </div>
    );
  }
}

export default App;
