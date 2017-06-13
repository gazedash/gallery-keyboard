import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Link from "../Link";
import styles from "./CardItem.css";

class CardItem extends PureComponent {
  get image() {
    return this.props.image;
  }

  get isActive() {
    return this.props.isActive;
  }

  get url() {
    return this.props.url;
  }

  get className() {
    const { isActive, activeClassName, className } = this.props;
    return isActive ? activeClassName : className;
  }

  handleClick = this.handleClick.bind(this);
  handleClick(e) {
    e.preventDefault();
    this.props.onClick({ image: this.props.index });
  }

  render() {
    return (
      <Link
        href={this.url}
        className={this.className}
        onClick={this.handleClick}
      >
        <img
          className={styles.image}
          height={this.props.height}
          width={this.props.width}
          src={this.image}
          alt=""
        />
      </Link>
    );
  }
}

CardItem.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  isActive: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  index: PropTypes.number,
  onClick: PropTypes.func
};

CardItem.defaultProps = {
  isActive: false,
  height: 128,
  width: 128,
  className: styles.root,
  activeClassName: styles.active,
  onClick: () => {}
};

export default CardItem;
