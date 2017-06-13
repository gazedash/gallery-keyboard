import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card } from "../Card";

class CardList extends PureComponent {
  isCardActive(index) {
    return this.props.activeRow === index;
  }

  handleClick = this.handleClick.bind(this);
  handleClick({ card, image }) {
    this.props.onClick({ card, image });
  }

  renderItem(index, e) {
    const { itemElement: ItemElement, itemProps } = this.props;

    const props = {
      isActive: this.isCardActive(index),
      activeId: this.props.activeId,
      key: e.id,
      items: e.items,
      onClick: ({ image }) => this.handleClick({ image, card: index }),
      ...itemProps
    };
    return <ItemElement {...props} />;
  }

  renderList() {
    return this.props.items.map((e, index) => {
      return this.renderItem(index, e);
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderList()}
      </div>
    );
  }
}

CardList.propTypes = {
  itemElement: PropTypes.func,
  itemProps: PropTypes.object,
  activeId: PropTypes.number,
  activeRow: PropTypes.number,
  items: PropTypes.array,
  className: PropTypes.string,
  onClick: PropTypes.func
};

CardList.defaultProps = {
  itemElement: Card,
  itemProps: {},
  activeId: 0,
  activeRow: 0,
  items: [],
  className: null,
  onClick: () => {}
};

export default CardList;
