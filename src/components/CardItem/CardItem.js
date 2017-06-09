import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./CardItem.css";

class CardItem extends PureComponent {
  get image() {
    return this.props.image;
  }

  get active() {
    return this.props.active;
  }

  get url() {
    return this.props.url;
  }

  get activeStyle() {
    const { activeStyle, style } = this.props;
    return this.active && activeStyle ? activeStyle : style;
  }

  handleClick = this.handleClick.bind(this);
  handleClick(e) {
    e.preventDefault();
    this.props.onClick({ image: this.props.index });
  }

  render() {
    return (
      <div style={this.props.style} onClick={this.handleClick}>
        <a target="_blank" rel="noopener noreferrer" href={this.url}>
          <img
            height={this.props.height}
            width={this.props.width}
            src={this.image}
            alt=""
          />
        </a>
      </div>
    );
  }
}

CardItem.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  active: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  style: PropTypes.object,
  index: PropTypes.number,
  activeStyle: PropTypes.object,
  onClick: PropTypes.func
};

CardItem.defaultProps = {
  active: false,
  height: 128,
  width: 128,
  style: null,
  activeStyle: null,
  onClick: () => {}
};

export default CardItem;
