import React, { Component } from "react";
import PropTypes from "prop-types";

class CardItem extends Component {
  render() {
    return (
      <div>
        <div style={this.props.active ? { border: "10px solid red" } : null}>
        <a href={this.props.url}>
          <img height={128} width={128} src={this.props.image} />
        </a>
        </div>
      </div>
    );
  }
}

CardItem.propTypes = {
  isZoomed: PropTypes.bool,
  image: PropTypes.string,
  url: PropTypes.string,
  active: PropTypes.bool
};

CardItem.defaultProps = {
  isZoomed: false,
  active: false
};

export default CardItem;
