import React, { PureComponent } from "react";
import CardItem from "../CardItem";
import PropTypes from "prop-types";

class Card extends PureComponent {
  get active() {
    return this.props.active;
  }

  get currentImageId() {
    return this.props.currentImageId;
  }

  isCurrentActive(index) {
    return this.currentImageId === index && this.active;
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.props.items.map((item, i) => {
          const active = this.isCurrentActive(i);
          return (
            <CardItem
              onClick={this.props.onClick}
              active={active}
              key={item.image}
              image={item.image}
              url={item.url}
              index={i}
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
  active: PropTypes.bool,
  currentImageId: PropTypes.number,
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  itemFixedStyle: PropTypes.object,
  itemActiveStyle: PropTypes.object,
  onClick: PropTypes.func
};

Card.defaultProps = {
  items: [],
  isZoomed: false,
  horizontal: true,
  style: null,
  itemFixedStyle: null,
  onClick: () => {}
};

export default Card;
