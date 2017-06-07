import React, { Component } from "react";
import CardItem from "../CardItem";
import PropTypes from "prop-types";

class Card extends Component {
  get isZoomed() {
    return this.props.isZoomed;
  }

  get active() {
    return this.props.active;
  }

  get currentImageId() {
    return this.props.currentImageId;
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.props.items.map((item, i) => {
          const active = this.currentImageId === i && this.active;
          const isCurrentZoomed = this.isZoomed && active;
          return (
            <CardItem
              isZoomed={isCurrentZoomed}
              active={active}
              key={item.image}
              image={item.image}
              url={item.url}
              style={this.props.itemStyle}
              activeStyle={this.props.itemActiveStyle}
              fixedStyle={this.props.itemFixedStyle}
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
  currentImageId: PropTypes.number,
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  itemFixedStyle: PropTypes.object,
  itemActiveStyle: PropTypes.object
};

Card.defaultProps = {
  items: [],
  isZoomed: false,
  horizontal: true,
  itemStyle: null,
  itemFixedStyle: null,
  itemActiveStyle: null
};

export default Card;
