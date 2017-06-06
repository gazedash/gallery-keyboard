import React, { Component } from "react";
import CardItem from "./CardItem";
import PropTypes from "prop-types";

class Card extends Component {
  horizontalStyle = { display: "flex", flexWrap: "wrap", backgroundColor: this.props.active ? 'blue' : '#fff' };
  verticalStyle = { display: "flex", flexDirection: "column"};

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
      <div style={this.props.horizontal ? this.horizontalStyle : this.verticalStyle}>
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
  horizontal: PropTypes.bool,
};

Card.defaultProps = {
  items: [],
  isZoomed: false,
  horizontal: true,
};

export default Card;
