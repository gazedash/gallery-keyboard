import React, { Component } from "react";
import PropTypes from "prop-types";

class CardItem extends Component {
  defaultFixedStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    marginTop: this.marginTop,
    marginLeft: this.marginLeft
  };

  get marginTop() {
    return -(this.props.zoomHeight / 2);
  }

  get marginLeft() {
    return -(this.props.zoomWidth / 2);
  }

  get image() {
    return this.props.image;
  }

  get active() {
    return this.props.active;
  }

  get url() {
    return this.props.url;
  }

  get isZoomed() {
    return this.props.isZoomed;
  }

  get fixedStyle() {
    const { fixedStyle } = this.props;
    if (Object.keys(fixedStyle).length !== 0) {
      return fixedStyle;
    }
    return this.defaultFixedStyle;
  }

  get activeStyle() {
    const { activeStyle, style } = this.props;
    return this.active ? activeStyle : style;
  }

  widthOrZoomWidth(zoomed) {
    const { width, zoomWidth } = this.props;
    if (zoomed) {
      return zoomWidth;
    }
    return width;
  }

  heightOrZoomHeight(zoomed) {
    const { height, zoomHeight } = this.props;
    if (zoomed) {
      return zoomHeight;
    }
    return height;
  }

  renderInner(zoomed = false) {
    if (!this.isZoomed && zoomed) {
      return null;
    }
    const height = this.heightOrZoomHeight(zoomed);
    const width = this.widthOrZoomWidth(zoomed);
    return (
      <div style={this.activeStyle}>
        <a target="_blank" rel="noopener noreferrer" href={this.url}>
          <img height={height} width={width} src={this.image} alt="" />
        </a>
      </div>
    );
  }

  renderFixed() {
    return (
      <div style={this.fixedStyle}>
        {this.renderInner(true)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderInner()}
        {this.renderFixed()}
      </div>
    );
  }
}

CardItem.propTypes = {
  isZoomed: PropTypes.bool,
  image: PropTypes.string,
  url: PropTypes.string,
  active: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  zoomHeight: PropTypes.number,
  zoomWidth: PropTypes.number,
  style: PropTypes.object,
  fixedStyle: PropTypes.object,
  activeStyle: PropTypes.object
};

CardItem.defaultProps = {
  isZoomed: false,
  active: false,
  height: 128,
  width: 128,
  zoomHeight: 600,
  zoomWidth: 600,
  style: {},
  fixedStyle: {},
  activeStyle: {}
};

export default CardItem;
