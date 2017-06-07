import React from "react";
import {CardVertical} from "../Card"
import {CardContainer} from "./index";

 const style = { display: "flex", flexWrap: "wrap" };

export default props => (
  <CardContainer {...props } itemElement={<CardVertical />} style={{ ...props.style, ...style }} />
);