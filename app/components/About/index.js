/**
 *
 * About
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";
import commonMessages from "../../messages";
import './assets/css/main.css';

/* eslint-disable react/prefer-stateless-function */
class About extends React.Component {
  render() {
    return (
      <div>
<div className="headerBg">
        <div className="bgLayout"></div>
        <div className="text-center headerText">
            <h4 className=" display-4">
                <span><FormattedMessage {...commonMessages.welcomText} children={(message => message)} /></span>
            </h4>
        </div>
    </div>

    <div className="title contentBox">
        <h2><FormattedMessage {...messages.aboutUs} children={(message => message)} /></h2>
        <span className="lineLeft"></span>
        <span className="lineRight"></span>
    </div>

    <div className="container flex contentBox">
        <div className="fx-b50 position-relative">
            <div className="nVentLogo">
                <img src={ require('./assets/images/nVent-icon.png')} />
            </div>
        </div>
        <div className="fx-b50">
            <p className="contentText"> <b> Who We Are </b> </p>
            <p className="contentText"> Just as every idea begins with a spark, we at nVent view the dawn of every sunrise as a new opportunity to ignite innovation. Our inventive solutions benefit customers around the world every day, keeping lights on, data streaming and trains running on time. </p>
            <p className="contentText"> From heat trace cables to critical equipment enclosures to labor-efficient fastening systems, we empower customers to improve performance, lower costs and reduce downtime. </p>
            <p className="contentText"> We are a $2.2 billion, high-performance electrical company with a dedicated team of 9,400 people and trusted brands such as nVent <span className="brand">CADDY</span>,  <span className="brand">ERICO</span>,  <span className="brand">HOFFMAN</span>,  <span className="brand">RAYCHEM</span>,  <span className="brand">SCHROFF</span> and  <span className="brand">TRACER</span>. Known for innovation, quality and reliability, our products connect and protect, consistently delivering value to industrial, commercial, residential, energy and infrastructure customers. </p>
            <p className="contentText"> While our name may be new, our products have set the standards for quality for more than a century. Today as nVent, we are focused and forward-looking, ready to build upon our legacy. The future is now.</p>
        <hr/>
            <p className="contentText"> <b> Our Mission: At nVent, we believe that safer systems ensure a more secure world. We connect and protect our customers with inventive electrical solutions. </b> </p>
        </div>

    </div>


    <div className="detailBlock contentBox">
        <div className="flex container">
            <div className="fx-b25 pd-r-40">
                <p>Our powerful portfolio of brands:</p>
                <p><span className="brand">CADDY</span>  <span className="brand">ERICO</span>  <span className="brand">HOFFMAN</span>  <span className="brand">RAYCHEM</span>  <span className="brand">SCHROFF</span> <span className="brand">TRACER</span> </p>
 
            </div>
        </div>
    </div>

    <div className="footer">
        <div className="container flex justify-content-between">
            <p>&copy; 2019 Software V - ---</p>
            <ul>
                <li><a href="#" target="_blank"><FormattedMessage {...commonMessages.about} children={(message => message)} /></a></li>
                <li><a href="#" target="_blank"><FormattedMessage {...commonMessages.contact} children={(message => message)} /></a></li>
                <li><a href="#" target="_blank"><FormattedMessage {...commonMessages.license} children={(message => message)} /></a></li>
            </ul>
        </div>
    </div>

        </div>
    );
  }
}

About.propTypes = {};

export default About;
