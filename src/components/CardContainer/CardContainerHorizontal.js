import React from "react";
import { CardHorizontal } from "../Card";
import { CardContainer } from "./index";

const style = { display: "flex", flexDirection: "column" };

export default props => (
  <CardContainer
    itemElement={CardHorizontal}
    style={{ ...props.style, ...style }}
    {...props}
  />
);
