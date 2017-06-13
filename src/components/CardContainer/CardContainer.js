// up-down: people, left-right: images
// https://www.google.ru/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiRi9SB76PUAhWDHpoKHfDSA7EQFggoMAA&url=http%3A%2F%2Fjson-schema-faker.js.org%2F&usg=AFQjCNEYtb2dCxzhExIehocbtM837gU5Fw&sig2=SoO5WaKvGYVjlbRoyl_3VA
// {
//   "type": "array",
//   "minItems": 30,
//   "maxItems": 40,
//   "items": {
//   "type": "object",
//   "properties": {
//         "name": {
//           "type": "string",
//           "faker": "name.findName"
//         },
//         "url": {
//           "type": "string",
//           "format": "email",
//           "faker": "internet.url"
//         },
//         "images": {
//           "type": "array",
//           "minItems": 3,
//           "maxItems": 10,
//           "items": {
//             "type": "string",
//             "faker": "image.avatar"
//           }
//     }
//   },
//       "required": [
//         "images",
//         "name",
//         "url"
//       ]
// }
// }
import React, { Component } from "react";
import { Card } from "../Card";
import { CardItemFixed } from "../CardItem";
import CardList from "../CardList";
import data from "../../data.json";
// import data2 from "../../data2.json";
import PropTypes from "prop-types";
import { validateKey, getNext } from "../../utils";
import styles from "./CardContainer.css";
class CardContainer extends Component {
  state = {
    activeRow: 0,
    activeId: 0,
    isZoomed: false
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  setZoomed(code) {
    const { isZoomed } = this.state;
    if (validateKey(code, this.props.zoomKey)) {
      this.setState({
        isZoomed: !isZoomed
      });
    }
  }

  escapeZoom(code) {
    const { isZoomed } = this.state;
    if (validateKey(code, this.props.zoomEscKey) && isZoomed) {
      this.setState({
        isZoomed: false
      });
    }
  }

  moveSide(code) {
    const isLeftKey = validateKey(code, this.props.leftKey);
    const isRightKey = validateKey(code, this.props.rightKey);
    if (isLeftKey || isRightKey) {
      this.setState(oldState => ({
        activeId: this.getNextImage(isLeftKey, isRightKey)
      }));
    }
  }

  setActive = this.setActive.bind(this);
  setActive({ card = null, image = null }) {
    const { activeRow, activeId } = this.state;
    if (!(activeRow === card && activeId === image)) {
      this.setState(oldState => {
        const { activeRow, activeId } = oldState;
        const newCard = card !== null ? card : activeRow;
        const newImage = image !== null ? image : activeId;
        return {
          activeRow: newCard,
          activeId: newImage
        };
      });
    }
    // } else {
    //   this.setState(oldState => {
    //     return {
    //       isZoomed: !oldState.isZoomed
    //     };
    //   });
    // }
  }

  moveHor(code) {
    const isUpKey = validateKey(code, this.props.upKey);
    const isDownKey = validateKey(code, this.props.downKey);
    if (isUpKey || isDownKey) {
      const newCard = this.getNextCard(isUpKey, isDownKey);
      this.setState(oldState => ({
        activeRow: newCard,
        activeId: this.adjustNextCardImagePosition(newCard)
      }));
    }
  }

  getNextImage(isLeftKey, isRightKey) {
    return getNext({
      isPrevKey: isLeftKey,
      isNextKey: isRightKey,
      limit: this.activeIdsLength,
      current: this.activeId,
      loop: true
    });
  }

  handleKeyPress = this.handleKeyPress.bind(this);
  handleKeyPress(e) {
    const { keyType } = this.props;
    const { [keyType]: code = e } = e;

    this.setZoomed(code);
    this.moveSide(code);
    this.moveHor(code);
    this.escapeZoom(code);
  }

  get activeIdsLength() {
    return this.getImagesLength(this.activeRow);
  }

  get activeId() {
    return this.state.activeId;
  }

  get activeRow() {
    return this.state.activeRow;
  }

  get isZoomed() {
    return this.state.isZoomed;
  }

  getImagesLength(index) {
    return this.props.items[index].items.length;
  }

  get activeRowItem() {
    return this.props.items[this.activeRow];
  }
  get activeIdItem() {
    return this.activeRowItem.items[this.activeId];
  }

  getNextCard(isUpKey, isDownKey) {
    return getNext({
      isPrevKey: isUpKey,
      isNextKey: isDownKey,
      limit: this.props.items.length,
      current: this.activeRow
    });
  }

  adjustNextCardImagePosition(newCard) {
    const newLimit = this.getImagesLength(newCard);
    return this.activeId >= newLimit ? 0 : this.activeId;
  }

  isCardActive(index) {
    return this.activeRow === index;
  }

  renderFixed() {
    if (this.isZoomed) {
      const { fixedElement: FixedElement } = this.props;
      return (
        <FixedElement
          isActive={true}
          image={this.activeIdItem.image}
          url={this.activeIdItem.url}
        />
      );
    }
    return null;
  }

  renderCards() {
    const { listElement: ListElement } = this.props;
    const props = {
      activeRow: this.activeRow,
      activeId: this.activeId,
      items: this.props.items,
      className: this.props.className,
      itemElement: this.props.itemElement,
      onClick: this.setActive
    };
    return <ListElement {...props} />;
  }

  render() {
    return (
      <div>
        {this.renderFixed()}
        {this.renderCards()}
      </div>
    );
  }
}

const StringOrNumberOrEventPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.shape({
    key: PropTypes.string,
    code: PropTypes.string,
    keyCode: PropTypes.number,
    altKey: PropTypes.bool,
    ctrlKey: PropTypes.bool,
    shiftKey: PropTypes.bool,
    metaKey: PropTypes.bool
  })
]);

CardContainer.propTypes = {
  listElement: PropTypes.func,
  fixedElement: PropTypes.func,
  itemElement: PropTypes.func,
  keyType: PropTypes.oneOf(["code", "keyCode", "key", "event"]),
  zoomKey: StringOrNumberOrEventPropType,
  leftKey: StringOrNumberOrEventPropType,
  rightKey: StringOrNumberOrEventPropType,
  upKey: StringOrNumberOrEventPropType,
  downKey: StringOrNumberOrEventPropType,
  zoomEscKey: StringOrNumberOrEventPropType,
  className: PropTypes.string,
  items: PropTypes.array
};

CardContainer.defaultProps = {
  listElement: CardList,
  fixedElement: CardItemFixed,
  itemElement: Card,
  keyType: "key",
  //  zoomKey: { key: "g", ctrlKey: true, altKey: true },
  zoomKey: "g",
  leftKey: "h",
  rightKey: "l",
  upKey: "j",
  downKey: "k",
  zoomEscKey: "Escape",
  className: styles.root,
  items: mapDataToImages()
};

// function mapDataToImages2() {
//   return data2.map((item, id) => {
//     const items = item.items.map(image => ({
//       image: image.url
//     }));

//     return {
//       id,
//       items
//     };
//   });
// }

function mapDataToImages() {
  return data.map((item, id) => {
    const { url, name, images } = item;
    const items = images.map(image => ({
      image,
      url,
      name
    }));
    return {
      id,
      items,
      url,
      name
    };
  });
}

export default CardContainer;
