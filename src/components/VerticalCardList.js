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
  state = {
    currentCard: 0,
    currentImage: 0,
    isZoomed: false
  };

  componentDidMount() {
    window.addEventListener("keypress", this.handleKeyPress);
  }

  handleKeyPress = this.handleKeyPress.bind(this);
  handleKeyPress(e) {
    const { isZoomed, currentImage, currentCard } = this.state;
    if (e.code === "KeyG") {
      this.setState({
        isZoomed: !isZoomed
      });
    }
    if (e.code === "KeyH" || e.code === "KeyL") {
      const diff = e.code === "KeyH" ? -1 : e.code === "KeyL" ? 1 : 0;
      const limit = data[this.state.currentCard].images.length;
      const currentPlusDiff = currentImage + diff;
      this.setState(oldState => ({
        currentImage: this.moveHor(currentPlusDiff, limit)
      }));
    }
    if (e.code === "KeyJ" || e.code === "KeyK") {
      const diff = e.code === "KeyJ" ? -1 : e.code === "KeyK" ? 1 : 0;
      const limit = data.length;
      const currentPlusDiff = currentCard + diff;
      const newCard = this.moveHor(currentPlusDiff, limit);
      const newLimit = data[newCard].images.length;
      this.setState(oldState => ({
        currentCard: newCard,
        currentImage: currentImage >= newLimit ? 0 : currentImage
      }));
    }
  }

  moveHor(currentPlusDiff, limit, loop = false) {
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

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.map((e, i) => {
          const items = e.images.map(image => {
            return {
              image,
              url: e.url,
              name: e.name
            };
          });
          return (
            <Card
              isZoomed={this.state.isZoomed}
              active={this.state.currentCard === i}
              currentImageId={this.state.currentImage}
              key={e.name}
              items={items}
            />
          );
        })}
      </div>
    );
  }
}

export default VerticalCardList;
