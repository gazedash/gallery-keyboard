import React from "react";
import {CardVertical} from "../Card"
import {CardContainer} from "./index";

 const style = { display: "flex" };

export default props => (
  <CardContainer {...props } itemElement={<CardVertical />} style={{ ...props.style, ...style }} />
);