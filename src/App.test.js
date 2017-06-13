import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

describe("App", () => {
  console.error = jest.fn();
  const div = document.createElement("div");
  test("renders without crushing", async () => {
    await ReactDOM.render(<App />, div);
  });
  test("doesn't throw errors in runtime", () => {
    // +test for required props to be passed
    expect(console.error).not.toBeCalled();
  });
});
