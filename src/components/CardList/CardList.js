import React, { PureComponent, cloneElement } from "react";
import PropTypes from "prop-types";
import { Card } from "../Card";

class CardList extends PureComponent {
  isCardActive(index) {
    return this.props.currentCard === index;
  }

  handleClick = this.handleClick.bind(this);
  handleClick({ card, image }) {
    this.props.onClick({ card, image });
  }

  renderItem(children, index, e) {
    const props = {
      isZoomed: this.props.isZoomed,
      active: this.isCardActive(index),
      currentImageId: this.props.currentImage,
      key: e.url,
      items: e.items,
      onClick: ({ image }) => this.handleClick({ image, card: index })
    };
    return cloneElement(children, { ...props });
  }

  renderList() {
    return this.props.items.map((e, index) => {
      return this.renderItem(this.props.itemElement, index, e);
    });
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.renderList()}
      </div>
    );
  }
}

CardList.propTypes = {
  itemElement: PropTypes.object,
  isZoomed: PropTypes.bool,
  currentImage: PropTypes.number,
  currentCard: PropTypes.number,
  items: PropTypes.array,
  style: PropTypes.object,
  onClick: PropTypes.func
};

CardList.defaultProps = {
  itemElement: <Card />,
  isZoomed: false,
  items: [],
  style: null,
  onClick: () => {}
};

export default CardList;
