/**
 *
 * Carousel
 *
 */

import React from "react";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from '../../messages';
import $ from 'jquery'
const _ = require('lodash');
/* eslint-disable react/prefer-stateless-function */

const SlideButton = (props) => (
  <span
    className={props.disable ? "btn-slideCarouselNone" : `btn-slideCarousel ${props.direction}`}
    onClick={props.clickFunction}
  >
    {props.buttonStyle}
  </span>
);

class Carousel extends React.PureComponent {
  autoPlayInterval
  state = {
    itemWidth: 100 / this.props.showContent,
    slides: [],
    maxSlide: 0,
    currentSlide: 0
  }

  componentDidMount() {
    this.carouselCalc(this.props.data)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoPlay) {
      this.autoPlayInterval = setInterval(() => this.slide(this.state.currentSlide + 1), nextProps.slidingDuration)
    } else {
      clearInterval(this.autoPlayInterval)
    }

    if (!_.isEqual(nextProps.data, this.props.data) || !_.isEqual(nextProps.showContent != this.props.showContent)) {
      if (nextProps.data.length > this.props.data.length) {
        this.carouselCalc(nextProps.data, () => {
          this.slide(this.state.maxSlide);
        })
      } else if (nextProps.data.length < this.props.data.length) {
        this.carouselCalc(nextProps.data, () => {
          this.slide(this.state.currentSlide == 0 ? 0 : this.state.currentSlide - 1);
        })
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.autoPlayInterval)
  }

  carouselCalc = (data, cb) => {
    let carouselWidth = data.length * this.state.itemWidth,
      slidingWidth = this.state.itemWidth * this.props.slideContent,
      maxPositionX = carouselWidth > 100 ? (carouselWidth - 100) * -1 : 0,
      maxSlide,
      slides = []

    for (let i = 0; i < data.length; i++) {
      let index = i,
        positionX = slidingWidth * index * -1

      if (positionX <= maxPositionX) {
        positionX = maxPositionX
        i = data.length
      }
      slides.push({ index, positionX })
    }
    maxSlide = slides.length - 1
    this.setState({ slides, maxSlide }, () => {
      if (cb)
        cb();
    })
  }

  slide = (currentSlide) => {
    if (currentSlide > this.state.maxSlide) {
      currentSlide = 0
    }
    else if (currentSlide < 0) {
      currentSlide = this.state.maxSlide
    }

    this.setState({ currentSlide })
    $("[rel='js-slideCarousel']").css({ transform: `translateX(${this.state.slides[currentSlide].positionX}%)` })
  }

  render() {
    let itemMaxWidth = this.state.itemWidth + "%",
      itemFlex = "0 " + "0 " + itemMaxWidth;

    return (
      <div className="carouselOuter">
        <ul className="customCarousel" id="" rel="js-slideCarousel" style={{ justifyContent: this.props.data.length < this.props.showContent ? "center" : null }}>
          {this.props.data.map((carouselContent, index) =>
            <li key={index} style={{ flex: itemFlex, maxWidth: itemMaxWidth }}>
              {carouselContent}
            </li>)}
        </ul>

        {this.props.showIndicators && this.state.maxSlide > 0 ?
          <ul className="customIndicators">
            {this.state.slides.map((val, index) =>
              <li key={index} className={this.state.currentSlide === index ? "active" : null} onClick={() => this.slide(index)}>
                {this.props.indicators ? this.props.indicators : <span className="carouselIndicator" />}
              </li>)}
          </ul>
          :
          null
        }

        <SlideButton
          direction="previous"
          clickFunction={() => this.slide(this.state.currentSlide - 1)}
          buttonStyle={this.props.previousButton}
          disable={this.props.infiniteCarousel || this.state.currentSlide === 0}
        />

        <SlideButton
          direction="next"
          clickFunction={() => this.slide(this.state.currentSlide + 1)}
          buttonStyle={this.props.nextButton}
          disable={this.props.infiniteCarousel || this.state.currentSlide === this.state.maxSlide}
        />
      </div>
    );
  }
}

Carousel.propTypes = {
  data: PropTypes.array.isRequired,
  showContent: PropTypes.number,
  slideContent: PropTypes.number,
  slidingDuration: PropTypes.number,
  infiniteCarousel: PropTypes.bool,
  autoPlay: PropTypes.bool,
  nextButton: PropTypes.element,
  previousButton: PropTypes.element,
  showIndicators: PropTypes.bool
};

Carousel.defaultProps = {
  showContent: 1,
  slideContent: 1,
  slidingDuration: 3000,
  infiniteCarousel: false,
  autoPlay: false,
  nextButton: '\u25B6',
  previousButton: '\u25C0',
  showIndicators: true
}

export default Carousel;
