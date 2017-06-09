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
import PropTypes from "prop-types";
import { validateKey, getNext } from "../../utils";

class CardContainer extends Component {
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
        currentImage: this.getNextImage(isLeftKey, isRightKey)
      }));
    }
  }

  setActive = this.setActive.bind(this);
  setActive({ card = null, image = null }) {
    const { currentCard, currentImage } = this.state;
    if (!(currentCard === card && currentImage === image)) {
      this.setState(oldState => {
        const { currentCard, currentImage } = oldState;
        const newCard = card !== null ? card : currentCard;
        const newImage = image !== null ? image : currentImage;
        return {
          currentCard: newCard,
          currentImage: newImage
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
    return this.props.items[index].items.length;
  }

  get currentCardItem() {
    return this.props.items[this.currentCard];
  }

  get currentImageItem() {
    return this.currentCardItem.items[this.currentImage];
  }

  getNextCard(isUpKey, isDownKey) {
    return getNext({
      isPrevKey: isUpKey,
      isNextKey: isDownKey,
      limit: this.props.items.length,
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

  renderFixed() {
    if (this.isZoomed) {
      return (
        <CardItemFixed
          active={true}
          image={this.currentImageItem.image}
          url={this.currentImageItem.url}
        />
      );
    }
    return null;
  }

  renderCards() {
    const { listElement: ListElement } = this.props;
    const props = {
      currentCard: this.currentCard,
      currentImage: this.currentImage,
      items: this.props.items,
      style: this.props.style,
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

CardContainer.propTypes = {
  listElement: PropTypes.func,
  fixedElement: PropTypes.func,
  keyType: PropTypes.oneOf(["code", "keyCode", "key", "event"]),
  zoomKey: StringOrNumberPropType,
  leftKey: StringOrNumberPropType,
  rightKey: StringOrNumberPropType,
  upKey: StringOrNumberPropType,
  downKey: StringOrNumberPropType,
  zoomEscKey: StringOrNumberPropType,
  style: PropTypes.object,
  items: PropTypes.array,
  itemElement: PropTypes.func
};

CardContainer.defaultProps = {
  listElement: CardList,
  keyType: "key",
  //  zoomKey: { key: "g", ctrlKey: true, altKey: true },
  zoomKey: "g",
  leftKey: "h",
  rightKey: "l",
  upKey: "j",
  downKey: "k",
  zoomEscKey: "Escape",
  style: null,
  items: mapDataToImages(),
  itemElement: Card,
  fixedElement: CardItemFixed
};

function mapDataToImages() {
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

export default CardContainer;
