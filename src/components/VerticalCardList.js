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
import { validateKey, minusOneOrZeroOrOne, move } from "../utils";
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
    const { currentImage } = this.state;
    const diff = minusOneOrZeroOrOne(isLeftKey, isRightKey);
    const limit = this.currentImagesLength;
    const currentPlusDiff = currentImage + diff;
    return move(currentPlusDiff, limit, true);
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
    const { currentCard } = this.state;
    return this.getImagesLength(currentCard);
  }

  getImagesLength(index) {
    return data[index].images.length;
  }

  getNextCard(isUpKey, isDownKey) {
    const { currentCard } = this.state;
    const diff = minusOneOrZeroOrOne(isUpKey, isDownKey);
    const limit = data.length;
    const currentPlusDiff = currentCard + diff;
    return move(currentPlusDiff, limit);
  }

  adjustNextCardImagePosition(newCard) {
    const { currentImage } = this.state;
    const newLimit = this.getImagesLength(newCard);
    return currentImage >= newLimit ? 0 : currentImage;
  }

  isCardActive(index) {
    const { currentCard } = this.state;
    return currentCard === index;
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
    const { currentImage, isZoomed } = this.state;
    return this.mapDataToImages().map((e, index) => {
      return (
        <Card
          isZoomed={isZoomed}
          active={this.isCardActive(index)}
          currentImageId={currentImage}
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
