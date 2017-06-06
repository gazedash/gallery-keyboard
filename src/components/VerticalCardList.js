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
class VerticalCardList extends Component {
  zoomKey = "KeyG";
  leftKey = "KeyH";
  rightKey = "KeyL";
  upKey = "KeyJ";
  downKey = "KeyK";
  zoomEscKey = "Escape";

  state = {
    currentCard: 0,
    currentImage: 0,
    isZoomed: false
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
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

  isZoomEscKey(code) {
    return code === this.zoomEscKey;
  }

  isZoomKey(code) {
    return code === this.zoomKey;
  }

  isUpKey(code) {
    return code === this.upKey;
  }

  isDownKey(code) {
    return code === this.downKey;
  }

  isLeftKey(code) {
    return code === this.leftKey;
  }

  isRightKey(code) {
    return code === this.rightKey;
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

  getNextImage(isLeftKey, isRightKey) {
    const { currentImage } = this.state;
    const diff = this.minusOneOrZeroOrOne(isLeftKey, isRightKey);
    const limit = this.currentImagesLength;
    const currentPlusDiff = currentImage + diff;
    return this.move(currentPlusDiff, limit, true);
  }

  minusOneOrZeroOrOne(first, second) {
    return first ? -1 : second ? 1 : 0;
  }

  handleKeyPress = this.handleKeyPress.bind(this);
  handleKeyPress(e) {
    const { code } = e;
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
    const diff = this.minusOneOrZeroOrOne(isUpKey, isDownKey);
    const limit = data.length;
    const currentPlusDiff = currentCard + diff;
    return this.move(currentPlusDiff, limit);
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

  adjustNextCardImagePosition(newCard) {
    const { currentImage } = this.state;
    const newLimit = this.getImagesLength(newCard);
    return currentImage >= newLimit ? 0 : currentImage;
  }

  move(currentPlusDiff, limit, loop = false) {
    let res = 0;
    const lastIndex = limit - 1;
    if (currentPlusDiff <= 0) {
      res = loop ? lastIndex : 0;
    } else {
      if (currentPlusDiff < limit) {
        res = currentPlusDiff;
      } else {
        res = loop ? 0 : lastIndex;
      }
    }
    return res;
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

export default VerticalCardList;
