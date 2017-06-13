import React from "react";
import CardItem from "./CardItem";
import styles from "./CardItemFixed.css";
export default props => (
  <CardItem
    className={styles.root}
    activeClassName={styles.active}
    width={600}
    height={600}
    {...props}
  />
);
