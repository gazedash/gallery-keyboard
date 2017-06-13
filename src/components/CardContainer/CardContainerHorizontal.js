import React from "react";
import { CardHorizontal } from "../Card";
import { CardContainer } from "./index";
import styles from "./CardContainerHorizontal.css";

export default props => (
  <CardContainer
    className={styles.root}
    itemElement={CardHorizontal}
    {...props}
  />
);
