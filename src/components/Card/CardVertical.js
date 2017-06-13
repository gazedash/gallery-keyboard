import React from "react";
import Card from "./Card";
import styles from "./CardVertical.css";

export default props => (
  <Card className={styles.root} activeClassName={styles.active} {...props} />
);
