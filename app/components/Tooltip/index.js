/**
 *
 * Tooltip
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import $ from 'jquery';
/* eslint-disable react/prefer-stateless-function */

class Tooltip extends React.PureComponent {

  componentDidMount() {
    var _self = this;
    $(document).mousemove(function (e) {
        if (e.target.hasAttribute("data-tooltip")) {
            _self.getTooltip(e.target);
        }
    });
  }

  getTooltip = (tooltipTag) => {
      let tooltipContainer = this.refs.tooltipContainer
      
      tooltipTag.addEventListener('mousemove', (e) => {
          let tooltipText = tooltipTag.dataset.tooltipText;
          tooltipContainer.innerHTML = tooltipText;
          let position = this.getTooltipPos(tooltipContainer, tooltipTag, e.clientX, e.clientY);
          let styleTooltip = {
              'left': position.tooltipX + 'px',
              'top': position.tooltipY + 'px',
              'visibility': 'visible'
          }
          Object.assign(tooltipContainer.style, styleTooltip);
          tooltipContainer.setAttribute("data-place", position.pointerY + "-" + position.pointerX);
      });
      
      tooltipTag.addEventListener('mouseleave', () => {
          tooltipContainer.style = {}
          tooltipContainer.innerHTML = ""
          tooltipContainer.setAttribute("data-place", "")
      });

      tooltipTag.addEventListener('click', () => {
          tooltipContainer.style = {}
          tooltipContainer.innerHTML = ""
          tooltipContainer.setAttribute("data-place", "")
      });
  }

  getTooltipPos = (tooltipContainer,tooltipTag, posX, posY) => {
      let tooltipWidth = tooltipContainer.offsetWidth,
          tooltipHeight = tooltipContainer.offsetHeight,
          body = document.getElementsByTagName('body')[0],
          maxPosX = body.offsetWidth - tooltipWidth,
          maxPosY = window.innerHeight - tooltipHeight,
          tooltipY, tooltipX, pointerX, pointerY, minDistance = 20,
          placeRight = tooltipTag.dataset.tooltipPlace === "right" && posX < maxPosX,
          placeBottom = tooltipTag.dataset.tooltipPlace === "bottom" && posY < maxPosY,
          placeLeft = tooltipTag.dataset.tooltipPlace === "left" && posX > tooltipWidth
      
      if (posY < tooltipHeight || placeBottom && posY < maxPosY) {
          tooltipY = posY + minDistance
          pointerY = "bottom"
      } else if ((posX < tooltipWidth || posX > maxPosX) && !(posY > maxPosY) || placeRight || placeLeft) {
          tooltipY = posY - tooltipHeight / 2
          pointerY = "center"
      } else {
          tooltipY = posY - tooltipHeight - minDistance
          pointerY = "top"
      }
      
      if (posX < tooltipWidth || placeRight) {
          tooltipX = posX + minDistance
          pointerX = "right"
      }
      else if (posX > maxPosX || placeLeft) {
          tooltipX = posX - tooltipWidth - minDistance
          pointerX = "left"
      } else {
          tooltipX = posX - tooltipWidth / 2
          pointerX = "center"
      }
      
      return {tooltipX, tooltipY, pointerX, pointerY}
  }

  render() {
    // for using this tooltip append data-tooltip in tag and data-tooltip-text= "tooltipcontent" and data-tooltip-place = "top/bottom/left/right"
      return (
          <div className="tooltip-wrapper" data-place="top-center" ref="tooltipContainer" />
      );
  }
}

Tooltip.propTypes = {};

export default Tooltip;
