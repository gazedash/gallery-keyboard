import React, { Component } from "react";
import CardItem from "./CardItem";
import PropTypes from "prop-types";

class Card extends Component {
  render() {
    return (
      <div style={{ display: "flex", backgroundColor: this.props.active ? 'blue' : '#fff' }}>
        {this.props.items.map((item, i) => {
          const active = this.props.currentImageId === i && this.props.active;
          const isCurrentZoomed = this.props.isZoomed && active;
          return (
            <CardItem
              isZoomed={isCurrentZoomed}
              active={active}
              key={item.image}
              image={item.image}
              url={item.url}
            />
          );
        })}
      </div>
    );
  }
}

Card.propTypes = {
  items: PropTypes.array,
  isZoomed: PropTypes.bool,
  active: PropTypes.bool,
  currentImageId: PropTypes.number
};

Card.defaultProps = {
  items: [],
  isZoomed: false,
};

export default Card;
