import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Link.css";
class Link extends Component {
  get className() {
    return `${this.props.className} ${styles.root}`;
  }

  render() {
    return (
      <a
        className={this.className}
        target={this.props.target}
        rel={this.props.rel}
        href={this.props.href}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func,
  rel: PropTypes.string,
  children: PropTypes.node
};

Link.defaultProps = {
  target: "_blank",
  onClick: null,
  rel: "noopener noreferrer"
};

export default Link;
