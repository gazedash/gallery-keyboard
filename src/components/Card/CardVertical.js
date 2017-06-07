import React from "react";
import Card from "./Card";

const style = { display: "flex", flexDirection: "column" };

export default props => (
  <Card {...props} style={{ ...props.style, ...style }} />
);
