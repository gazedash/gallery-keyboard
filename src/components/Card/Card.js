import React, { PureComponent } from "react";
import CardItem from "../CardItem";
import PropTypes from "prop-types";
import styles from "./Card.css";
class Card extends PureComponent {
  isCurrentActive(index) {
    return this.props.activeId === index && this.props.isActive;
  }

  get className() {
    const { isActive, className, activeClassName } = this.props;
    return isActive ? activeClassName : className;
  }

  itemClassName(isActive) {
    const { itemClassName, activeItemClassName } = this.props;
    const res = isActive ? activeItemClassName : itemClassName;
    if (res) {
      return res;
    }
  }

  render() {
    return (
      <div className={this.className}>
        {this.props.items.map((item, i) => {
          const isActive = this.isCurrentActive(i);
          return (
            <CardItem
              onClick={this.props.onClick}
              className={this.itemClassName(isActive)}
              isActive={isActive}
              key={item.image}
              image={item.image}
              url={item.url}
              index={i}
            />
          );
        })}
      </div>
    );
  }
}

Card.propTypes = {
  items: PropTypes.array,
  isActive: PropTypes.bool,
  activeId: PropTypes.number,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  activeItemClassName: PropTypes.string,
  onClick: PropTypes.func
};

Card.defaultProps = {
  items: [],
  horizontal: true,
  className: styles.root,
  activeClassName: styles.active,
  itemClassName: null,
  activeItemClassName: null,
  onClick: () => {}
};

export default Card;
