import React from "react";
import CardItem from "./CardItem";

const style = {
  position: "fixed",
  zIndex: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: "50%",
  bottom: "50%",
  margin: "auto",
  left: 0,
  right: 0,
  width: 600,
  height: 600
};

export default props => (
  <CardItem
    width={600}
    height={600}
    style={{ ...props.style, ...style }}
    {...props}
  />
);
