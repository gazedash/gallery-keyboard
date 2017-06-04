import React, { Component } from "react";
import PropTypes from "prop-types";

class CardItem extends Component {
  render() {
    return (
      <div>
        <a href={this.props.url}>
          <img src={this.props.image} />
        </a>
      </div>
    );
  }
}

CardItem.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string
};

export default CardItem;
