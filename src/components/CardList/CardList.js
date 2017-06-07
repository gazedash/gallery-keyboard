import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import { Card } from "../Card";

class CardList extends Component {
  isCardActive(index) {
    return this.props.currentCard === index;
  }

  renderItem(children, index, e) {
    const props = {
      isZoomed: this.props.isZoomed,
      active: this.isCardActive(index),
      currentImageId: this.props.currentImage,
      key: e.url,
      items: e.items
    };
    return cloneElement(children, { ...props });
  }

  renderList() {
    return (
      <div style={this.props.style}>
        {this.props.items.map((e, index) => {
          return this.renderItem(this.props.itemElement, index, e);
        })}
      </div>
    );
  }
  render() {
    return this.renderList();
  }
}

CardList.propTypes = {
  itemElement: PropTypes.object,
  isZoomed: PropTypes.bool,
  currentImage: PropTypes.number,
  currentCard: PropTypes.number,
  items: PropTypes.array,
  style: PropTypes.object
};

CardList.defaultProps = {
  itemElement: <Card />,
  isZoomed: false,
  items: [],
  style: null
};

export default CardList;
