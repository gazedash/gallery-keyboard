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
import Card from "./Card";
import data from "../data.json";
import PropTypes from "prop-types";
import { validateKey, getNext } from "../utils";

class VerticalCardList extends Component {
  state = {
    currentCard: 0,
    currentImage: 0,
    isZoomed: false
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  isZoomEscKey(code) {
    return validateKey(code, this.props.zoomEscKey);
  }

  isZoomKey(code) {
    return validateKey(code, this.props.zoomKey);
  }

  isUpKey(code) {
    return validateKey(code, this.props.upKey);
  }

  isDownKey(code) {
    return validateKey(code, this.props.downKey);
  }

  isLeftKey(code) {
    return validateKey(code, this.props.leftKey);
  }

  isRightKey(code) {
    return validateKey(code, this.props.rightKey);
  }

  setZoomed(code) {
    const { isZoomed } = this.state;
    if (this.isZoomKey(code)) {
      this.setState({
        isZoomed: !isZoomed
      });
    }
  }

  escapeZoom(code) {
    if (this.isZoomEscKey(code)) {
      this.setState({
        isZoomed: false
      });
    }
  }

  moveSide(code) {
    const isLeftKey = this.isLeftKey(code);
    const isRightKey = this.isRightKey(code);
    if (isLeftKey || isRightKey) {
      this.setState(oldState => ({
        currentImage: this.getNextImage(isLeftKey, isRightKey)
      }));
    }
  }

  moveHor(code) {
    const isUpKey = this.isUpKey(code);
    const isDownKey = this.isDownKey(code);
    if (isUpKey || isDownKey) {
      const newCard = this.getNextCard(isUpKey, isDownKey);
      this.setState(oldState => ({
        currentCard: newCard,
        currentImage: this.adjustNextCardImagePosition(newCard)
      }));
    }
  }

  getNextImage(isLeftKey, isRightKey) {
    return getNext({
      isPrevKey: isLeftKey,
      isNextKey: isRightKey,
      limit: this.currentImagesLength,
      current: this.currentImage,
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

  get currentImagesLength() {
    return this.getImagesLength(this.currentCard);
  }

  get currentImage() {
    return this.state.currentImage;
  }

  get currentCard() {
    return this.state.currentCard;
  }

  get isZoomed() {
    return this.state.isZoomed;
  }

  getImagesLength(index) {
    return data[index].images.length;
  }

  getNextCard(isUpKey, isDownKey) {
    return getNext({
      isPrevKey: isUpKey,
      isNextKey: isDownKey,
      limit: data.length,
      current: this.currentCard
    });
  }

  adjustNextCardImagePosition(newCard) {
    const newLimit = this.getImagesLength(newCard);
    return this.currentImage >= newLimit ? 0 : this.currentImage;
  }

  isCardActive(index) {
    return this.currentCard === index;
  }

  mapDataToImages() {
    return data.map((item, index) => {
      const { url, name, images } = item;
      const items = images.map(image => ({
        image,
        url,
        name
      }));
      return {
        items,
        url,
        name
      };
    });
  }

  renderCards() {
    return this.mapDataToImages().map((e, index) => {
      return (
        <Card
          isZoomed={this.isZoomed}
          active={this.isCardActive(index)}
          currentImageId={this.currentImage}
          key={e.name}
          items={e.items}
        />
      );
    });
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {this.renderCards()}
      </div>
    );
  }
}

const StringOrNumberPropType = PropTypes.oneOfType([
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

VerticalCardList.propTypes = {
  keyType: PropTypes.oneOf(["code", "keyCode", "key", "event"]),
  zoomKey: StringOrNumberPropType,
  leftKey: StringOrNumberPropType,
  rightKey: StringOrNumberPropType,
  upKey: StringOrNumberPropType,
  downKey: StringOrNumberPropType,
  zoomEscKey: StringOrNumberPropType
};

VerticalCardList.defaultProps = {
  keyType: "key",
  //  zoomKey: { key: "g", ctrlKey: true, altKey: true },
  zoomKey: "g",
  leftKey: "h",
  rightKey: "l",
  upKey: "j",
  downKey: "k",
  zoomEscKey: "Escape"
};

export default VerticalCardList;
