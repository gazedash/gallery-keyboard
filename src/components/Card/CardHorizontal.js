import React from "react";
import Card from "./Card";

const style = {
  display: "flex",
  flexWrap: "wrap"
};

export default props => (
  <Card {...props} style={{ ...props.style, ...style }} />
);
