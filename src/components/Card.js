import React, { Component } from "react";
import CardItem from "./CardItem";
import PropTypes from "prop-types";

class Card extends Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => {
          return <CardItem key={item.image} image={item.image} url={item.url} />;
        })}
      </div>
    );
  }
}

Card.propTypes = {
  items: PropTypes.array,
  currentId: PropTypes.number
};

Card.defaultProps = {
  items: [],
  currentId: 0
};

export default Card;
