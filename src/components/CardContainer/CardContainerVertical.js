import React from "react";
import { CardVertical } from "../Card";
import { CardContainer } from "./index";

export default props => (
  <CardContainer
    itemElement={CardVertical}
    {...props}
  />
);
